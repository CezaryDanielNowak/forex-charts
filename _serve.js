/* eslint-disable */
'use strict'

var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var copyPaste = require('copy-paste')
var _ = require('lodash')

var configDefault = {
	path: './',
	logFunc: console.log,
	clipboard: true
}

module.exports = function start(config) {
	config = _.merge(configDefault, config)

	// Serve up public/ftp folder
	var serve = serveStatic('./public', {
		'index': ['index.html']
	})

	// Create server
	var server = http.createServer(function(req, res) {
		var done = finalhandler(req, res)
		serve(req, res, done)
	})

	// Listen
	config.logFunc('listening localhost:3000...')
	server.listen(3000)
	if (config.clipboard) {
		copyPaste.paste(function(data) {
			if(data) {
				return // We don't want to override clipboard.
			}
			copyPaste.copy('http://127.0.0.1:3000', function() {
				config.logFunc('http://127.0.0.1:3000 is saved in your clipboard')
			})
		})
	}
}
