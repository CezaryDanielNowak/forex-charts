import globalState from 'globalState'

class ForexValueButton extends React.Component {
	static propTypes = {
		value: React.PropTypes.text
	}

	constructor(props) {
		super(props)
		globalState.on('selectedForexValue', function(value) {
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
		globalState.set('selectedForexValue', this.props.value)
	}

	render() {
		let classNames = 'waves-effect waves-light btn'
		if (this.state.isActive) {
			classNames += ' red'
		}
		return (
			<a className={classNames} onClick={this.handleClick}>{this.props.value}</a>
		)
	}
}

export default ForexValueButton
