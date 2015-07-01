var config = {
	db: {
		username: "postgres",
		password: "",
		host: "localhost",
		port: "5432",
		name: "forex-charts"
	}
}

try {
	var localConfig = require('./config.local.js');
	config = _.merge(config, localConfig); // _.merge is deep clone
} catch(err) {}



config.db.getUrl = function() {
	var loginParams = '';
	if(config.db.username || config.db.password) {
		loginParams = config.db.username + ':' + config.db.password + '@';
	}
	return 'postgres://' + loginParams + config.db.host + ':' + config.db.port + '/' + config.db.name;
};

config.db.getKnex = function() {
	var getKnex = config.db.getKnex;
	if(getKnex.knex) {
		return getKnex.knex;
	}

	getKnex.knex = require('knex')({
		client: 'pg',
		connection: config.db.getUrl()
	});

	return getKnex.knex;
}

module.exports = config;
