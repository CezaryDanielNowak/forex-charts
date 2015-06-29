import React from 'react/addons'
import reactMixin from 'react-mixin'
import IntervalMixin from 'mixins/IntervalMixin'

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

class ChildToggler extends React.Component {
	static propTypes = {
		transitionName: React.PropTypes.string,
		delay: React.PropTypes.number,
		children: React.PropTypes.array
	}
	static defaultProps = {
		transitionName: 'fade',
		delay: 2000 // immutable after component mount
	}

	constructor(props) {
		super(props)
		this.state = {
			childIndex: 0
		}
	}

	componentWillMount() {
		this.setInterval(function() {
			let nextChildIndex = ++this.state.childIndex
			if (nextChildIndex > this.props.children.length - 1) {
				nextChildIndex = 0
			}
			this.setState({
				childIndex: nextChildIndex
			})
		}, this.props.delay)
	}

	getChild() {
		return this.props.children ? this.props.children[this.state.childIndex] : null
	}

	render() {
		let props = this.props
		// FIXME: transition is not working properly
		// return (
		// 	<ReactCSSTransitionGroup component="div" transitionName={props.transitionName} {...props}>
		// 		{this.getChild()}
		// 	</ReactCSSTransitionGroup>
		// )
		return (
			<div {...props}>
				{this.getChild()}
			</div>
		)
	}
}
reactMixin(ChildToggler.prototype, IntervalMixin)

export default ChildToggler
