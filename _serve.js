var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var copyPaste = require("copy-paste");
var _ = require('lodash');

configDefault = {
	path: "./",
	log: console.log
};

module.exports = function start(config) {
	config = _.extend(configDefault, config);

	// Serve up public/ftp folder 
	var serve = serveStatic('./public', {
		'index': ['index.html']
	});
	 
	// Create server 
	var server = http.createServer(function(req, res) {
		var done = finalhandler(req, res)
		serve(req, res, done)
	})
	 
	// Listen 
	config.log("listening localhost:3000...")
	server.listen(3000)

	copyPaste.copy("http://127.0.0.1:3000", function() {
		config.log("http://127.0.0.1:3000 is saved in your clipboard")
	});
};
