import React from 'react'
import globalStore from 'globalStore'

class TimeRangeView extends React.Component {
	static propTypes = {
		value: React.PropTypes.string
	}

	constructor(props) {
		super(props)
		this.state = {
			isActive: false
		}
	}

	render() {
		return null
	}
}

export default TimeRangeView
