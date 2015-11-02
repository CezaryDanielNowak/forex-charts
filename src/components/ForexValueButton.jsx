import React from 'react'
import globalStore from 'globalStore'

class ForexValueButton extends React.Component {
	static propTypes = {
		value: React.PropTypes.string
	}

	constructor(props) {
		super(props)
		globalStore.on('selectedForexValue', function(value) {
			this.setState({
				isActive: value === this.props.value
			})
		}.bind(this))

		this.state = {
			isActive: false
		}
	}

	handleClick(e) {
		e.preventDefault()
		globalStore.set('selectedForexValue', this.props.value)
	}

	render() {
		let classNames = 'waves-effect waves-light btn'
		if (this.state.isActive) {
			classNames += ' red'
		}
		return (
			<li>
				<a className={classNames} onClick={this.handleClick.bind(this)}>{this.props.value}</a>
			</li>
		)
	}
}

export default ForexValueButton
