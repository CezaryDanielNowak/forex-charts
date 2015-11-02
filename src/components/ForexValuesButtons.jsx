import React from 'react'
import ForexValueButton from 'components/ForexValueButton'
import BaseComponent from 'components/base/BaseComponent'

class ForexValuesButtons extends BaseComponent {

	static propTypes = {
		children: React.PropTypes.array
	}

	constructor(props) {
		super(props)
		this.state = {
			values: [
				'EUR/USD',
				'USD/JPY',
				'GBP/USD',
				'EUR/GBP',
				'USD/CHF',
				'EUR/JPY',
				'EUR/CHF',
				'USD/CAD',
				'AUD/USD',
				'GBP/JPY'
			]
		}
	}

	renderButtons() {
		return this.state.values.map(function(value) {
			return <ForexValueButton value={value} key={value} />
		})
	}

	render() {
		return (
			<ul className={this.getClassName()}>
				{this.props.children}
				{this.renderButtons()}
			</ul>
		)
	}
}

export default ForexValuesButtons
