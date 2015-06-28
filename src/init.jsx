import globalState from 'globalState'
import ForexValuesButtons from 'components/ForexValuesButtons'


export default function() {
	React.render(<ForexValuesButtons />, $('#forex_values').get(0))

	// visjs
	const DELAY = 1000
	let dataset = new vis.DataSet()
	let options = {
		start: vis.moment().add(-30, 'seconds'), // changed so its faster
		end: vis.moment(),
		dataAxis: {
			left: {
				range: {
					min: -10,
					max: 10
				}
			}
		},
		drawPoints: {
			style: 'circle' // square, circle
		},
		shaded: {
			orientation: 'bottom' // top, bottom
		}
	}
	let graph2d = new vis.Graph2d($('#chart_line_1').get(0), dataset, options)


	// a function to generate data points
	function y(x) {
		return (Math.sin(x / 2) + Math.cos(x / 4)) * 5
	}

	function renderStep() {
		// move the window (you can think of different strategies).
		let now = vis.moment()
		let range = graph2d.getWindow()
		let interval = range.end - range.start

		graph2d.setWindow(now - interval, now, {animation: false})
		setTimeout(renderStep, DELAY)
	}
	renderStep()

	/**
	 * Add a new datapoint to the graph
	 */
	function addDataPoint() {
		// add a new data point to the dataset
		let now = vis.moment()
		dataset.add({
			x: now,
			y: y(now / 1000)
		})

		// remove all data points which are no longer visible
		let range = graph2d.getWindow()
		let interval = range.end - range.start
		let oldIds = dataset.getIds({
			filter: function(item) {
				return item.x < range.start - interval
			}
		})
		dataset.remove(oldIds)

		setTimeout(addDataPoint, DELAY)
	}
	addDataPoint()

	// http://visjs.org/examples/graph2d/06_interpolation.html

	globalState.on('selectedForexValue', function() {})
	globalState.set('selectedForexValue', 'EUR/USD')
}
