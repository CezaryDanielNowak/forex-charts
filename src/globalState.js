function globalState(field, value) {
	if (arguments.length === 1) {
		return globalState._data[field]
	}
	let oldVal = globalState._data[field]
	globalState._data[field] = value
	if (value !== oldVal && globalState.on._data[field]) {
		globalState.on._data[field].forEach(function(callback) {
			callback(value, oldVal)
		})
	}
}
globalState.set = globalState
globalState.get = globalState
globalState._data = {}

globalState.on = function(field, callback) {
	if (!globalState.on._data[field]) {
		globalState.on._data[field] = []
	}
	globalState.on._data[field].push(callback)
}

globalState.on._data = {}

export default globalState
