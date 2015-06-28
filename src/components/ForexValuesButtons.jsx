import ForexValueButton from 'components/ForexValueButton'

class ForexValuesButtons extends React.Component {
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

	render() {
		let buttons = this.state.values.map(function(value) {
			return <ForexValueButton value={value} key={value} />
		})
		return (
			<div>
				{buttons}
			</div>
		)
	}
}

export default ForexValuesButtons
