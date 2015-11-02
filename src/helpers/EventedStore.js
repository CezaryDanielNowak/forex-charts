import _ from 'lodash'

export default class EventedStore {

	constructor(data) {
		if (data && !_.isPlainObject(data)) {
			throw new Error('data provided to EventedStore is not an object')
		}
		this._data = data || {}
		this._events = {}
	}

	get(field) {
		return this._data[field]
	}

	set(field, value, silent = false) {
		let oldVal = this._data[field]
		this._data[field] = value
		if (!silent) {
			this.trigger(field, value, oldVal)
		}
	}

	on(field, callback) {
		if (!this._events[field]) {
			this._events[field] = []
		}
		this._events[field].push(callback)
	}

	off(field, callback) {
		if (this._events[field]) {
			_.remove(this._events[field], function(cb) {
				return cb === callback
			})
		}
	}

	trigger(field, value, oldVal) {
		if (value !== oldVal && this._events[field]) {
			this._events[field].forEach(function(callback) {
				callback(value, oldVal)
			})
		}
	}

}
