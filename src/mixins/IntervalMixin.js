
export default {
	__intervals: [],
	setInterval: function(callback, time) {
		this.__intervals.push(
			setInterval(callback.bind(this), time)
		)
	},
	componentWillUnmount: function() {
		this.__intervals.forEach(function(interval) {
			clearInterval(interval)
		})
		this.__intervals.length = 0
	}
}
