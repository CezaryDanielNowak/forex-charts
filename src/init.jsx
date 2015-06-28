import React from 'react'
import util from 'util'
import globalState from 'globalState'
import ForexValuesButtons from 'components/ForexValuesButtons'
import MainPage from 'components/MainPage/MainPage'

export default function init() {
	React.render(<MainPage />, document.getElementById('app'))

	// React.render(<ForexValuesButtons />, $('#forex_values').get(0))

	// // visjs
	// const DELAY = 1000
	// let dataset = new vis.DataSet()
	// let options = {
	// 	start: vis.moment().add(-30, 'seconds'), // changed so its faster
	// 	end: vis.moment(),
	// 	dataAxis: {
	// 		left: {
	// 			range: {
	// 				min: -10,
	// 				max: 10
	// 			}
	// 		}
	// 	},
	// 	drawPoints: {
	// 		style: 'circle' // square, circle
	// 	},
	// 	shaded: {
	// 		orientation: 'bottom' // top, bottom
	// 	}
	// }
	// let graph2d = new vis.Graph2d($('#chart_line_1').get(0), dataset, options)


	// // a function to generate data points
	// function y(x) {
	// 	return (Math.sin(x / 2) + Math.cos(x / 4)) * 5
	// }

	// function renderStep() {
	// 	// move the window (you can think of different strategies).
	// 	let now = vis.moment()
	// 	let range = graph2d.getWindow()
	// 	let interval = range.end - range.start

	// 	graph2d.setWindow(now - interval, now, {animation: false})
	// 	setTimeout(renderStep, DELAY)
	// }
	// renderStep()

	// /**
	//  * Add a new datapoint to the graph
	//  */
	// function addDataPoint() {
	// 	// add a new data point to the dataset
	// 	let now = vis.moment()
	// 	dataset.add({
	// 		x: now,
	// 		y: y(now / 1000)
	// 	})

	// 	// remove all data points which are no longer visible
	// 	let range = graph2d.getWindow()
	// 	let interval = range.end - range.start
	// 	let oldIds = dataset.getIds({
	// 		filter: function(item) {
	// 			return item.x < range.start - interval
	// 		}
	// 	})
	// 	dataset.remove(oldIds)

	// 	setTimeout(addDataPoint, DELAY)
	// }
	// addDataPoint()

	// // http://visjs.org/examples/graph2d/06_interpolation.html

	// globalState.on('selectedForexValue', function() {})
	// globalState.set('selectedForexValue', 'EUR/USD')


	util.showProgress(document.body, false)
}

function polifill() {
	// TODO: synchronouse request to: https://github.com/es-shims/es5-shim


	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	// Edit: assert throws error, ES6 syntax.
	(function(global) {
		global.console = global.console || {}
		let con = global.console
		let prop
		let method
		let empty = {}
		let dummy = function() {}
		let properties = 'memory'.split(',')
		let methods = ('clear,count,debug,dir,dirxml,error,exception,group,' +
			'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
			'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',')
		while (prop = properties.pop()) if (!con[prop]) con[prop] = empty
		while (method = methods.pop()) if (!con[method]) con[method] = dummy

		con.assert = function(assertion, errorMsg) {
			if (!assertion) {
				throw {
					name: 'AssertionError',
					message: errorMsg
				}
			}
		}
	})(typeof window === 'undefined' ? this : window)
}

polifill()
init()
