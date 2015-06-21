'use strict';

var TRUEFX_DATA_PATH = './data/truefx-history/';
var OUTPUT_DATA_PATH = './data/';

var fs = require('fs');
var unzip = require('unzip');
var Datastore = require('nedb');
var csv = require("fast-csv");

var historyDB = new Datastore({
	filename: TRUEFX_DATA_PATH + "history.nedb",
	autoload: true
});

/*
	What it does:
		It takes ZIP files from truefx and converts into our data.
		It is aware of already-converted files - converted filenames are stored in history.nedb

	How to use it?
	- download historical data from: https://www.truefx.com/dev/data/2015/
	- save it in ./data/truefx-history


*/

if(typeof Promise === "undefined") {
	throw {
		name: "PromiseObjectUndefined",
		message: "Promise is not defined in your enviroment. Please update nodeJS."
	};
}


function startConversion(inputFileName) {
	return new Promise(function(resolve, reject) {
		historyDB.findOne({fileName: inputFileName}, function (err, doc) {
			if(err) {
				console.warn("some uncaught in historyDB.findOne", err);
			}
			if(doc) {
				return reject(inputFileName + " already converted");
			}
			fs.createReadStream(TRUEFX_DATA_PATH + inputFileName)
			.pipe(unzip.Parse())
			.on('entry', function (entry) {
				var fileName = entry.path;
				var type = entry.type; // 'Directory' or 'File' 
				if (type === "File" && fileName.substr(-4) === '.csv') {
					console.log("Unpacking... " + fileName);

					// don't save filename, there is value column in CSV
					entry.pipe(fs.createWriteStream(TRUEFX_DATA_PATH + 'temp/data.csv'));
					resolve(TRUEFX_DATA_PATH + 'temp/data.csv', inputFileName);
				} else {
					entry.autodrain();
				}
			});

		});
	});
}

function readCSV(csvFilePath, inputFileName) {
	return new Promise(function(resolve, reject) {
		var dbData = {};
		var oldDBName = null;
		console.log("Read CSV file: " + csvFilePath);
		var saveDbData = function(dbName) {
			if(!dbName) {
				return false;
			}
			console.log("Save dict to DB: " + dbName);
			new Datastore({
				filename: OUTPUT_DATA_PATH + dbName + ".nedb",
				autoload: true
			}).insert(dbData[dbName], function(err) {
				if(err) {
					console.error("unhandled error", err);
					return;
				}
				delete dbData[dbName];
			});
			return true;
		};
		var stream = fs.createReadStream(csvFilePath);

		csv
		.fromStream(stream, {
			headers : ["value", "dateTime", "Low", "High"]
		}).on("data", function(data){
			/*
			sample data:
			data { value: 'USD/JPY',
			  dateTime: '20150401 00:44:08.809',
			  Low: '119.896',
			  High: '119.902' }
			*/
			// create ISO String
			var dateTime = data.dateTime.substr(0, 4) + '-';
			dateTime += data.dateTime.substr(4, 2) + '-';
			dateTime += data.dateTime.substr(6, 2) + 'T';
			dateTime += data.dateTime.substr(9) + "Z"; // Z means UTC
			data.dateTime = dateTime;

			var dbName = dateTime.substr(0, 10) + "_" + data.value.replace('/', '');
			if(!dbData[dbName]) {
				if(oldDBName) {
					saveDbData(oldDBName);
				}
				oldDBName = dbName;
				console.log("Create dict: " + dbName);
				dbData[dbName] = [];
			}

			delete data.value;
			dbData[dbName].push(data); // memory consumption will be painful, sorry

		}).on("end", function(){
			// there should be one DB to save
			var dbNames = Object.keys(dbData);
			while(1) {
				if(!saveDbData(dbNames.shift())) {
					break;
				}
			}
			historyDB.insert({
				fileName: inputFileName,
				status: "OK"
			});
			//TODO: remove .csv file?
			console.log("fin.");
			resolve();
		});
	});
}

var zipFiles = fs.readdirSync(TRUEFX_DATA_PATH).filter(function(fileName) {return fileName.substr(-4) === ".zip";});

function start() {
	var zipFile = zipFiles.shift();
	if(!zipFile) {
		console.log("FIN.");
	}
	startConversion(zipFile)
	.then(function(csvFilePath, inputFileName) {
		readCSV(csvFilePath, inputFileName).then(function () {
			start(); // start process again with next zip file.
		});
	})
	.catch(function(err) {
		console.log(err);
		start();
	});
	
}

start();
