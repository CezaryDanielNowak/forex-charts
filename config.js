var _ = require("lodash");

var config = {
	db: {
		username: "postgres",
		password: "",
		host: "localhost",
		port: "5432",
		dbName: "forex-charts",
		debug: false
	}
}

try {
	/*
		Try to load local config file that overrides config.
		Sample config.local.js:
		module.exports = {
			db: {
				username: "JohnDoe",
				password: "mysecretpass"
			}
		}

	 */
	var localConfig = require('./config.local.js');
	config = _.merge(config, localConfig); // _.merge is deep clone
} catch(err) {}

config.db.getConnectionUrl = function() {
	var loginParams = '';
	if(config.db.username || config.db.password) {
		loginParams = config.db.username + ':' + config.db.password + '@';
	}
	return 'postgres://' + loginParams + config.db.host + ':' + config.db.port + '/' + config.db.dbName;
};

var knexInstance = null;
config.db.getKnex = function() {
	if(knexInstance === null) {
		knexInstance = require('knex')({
			client: 'pg',
			connection: config.db.getConnectionUrl(),
			debug: config.db.debug
		});
	}

	return knexInstance;
};

module.exports = config;
