import React from 'react'
import util from 'util'
import globalState from 'globalState'
import ForexValuesButtons from 'components/ForexValuesButtons'
import mui from 'material-ui'
import {Toolbar, ToolbarGroup, DropDownMenu, ToolbarTitle, FontIcon, DropDownIcon, ToolbarSeparator, RaisedButton} from 'material-ui'

let Dialog = mui.Dialog
let ThemeManager = new mui.Styles.ThemeManager()
let Colors = mui.Styles.Colors

export default class MainPage extends React.Component {
	static childContextTypes = {
		muiTheme: React.PropTypes.object
	}
	getChildContext() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		}
	}

	componentWillMount() {
		ThemeManager.setPalette({
			accent1Color: Colors.deepOrange500
		})
	}

	_handleTouchTap() {
		this.refs.superSecretPasswordDialog.show()
	}

	render() {
		let filterOptions = [
			{ payload: '1', text: 'All Broadcasts' },
			{ payload: '2', text: 'All Voice' },
			{ payload: '3', text: 'All Text' },
			{ payload: '4', text: 'Complete Voice' },
			{ payload: '5', text: 'Complete Text' },
			{ payload: '6', text: 'Active Voice' },
			{ payload: '7', text: 'Active Text' }
		]
		let iconMenuItems = [
			{ payload: '1', text: 'Download' },
			{ payload: '2', text: 'More Info' }
		]
		return (
			<div>
				<Toolbar>
					<ToolbarGroup key={0} float="left">
						<DropDownMenu menuItems={filterOptions} />
					</ToolbarGroup>
					<ToolbarGroup key={1} float="right">
						<ToolbarTitle text="Options" />
						<FontIcon className="mui-icon-sort" />
						<DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
						<ToolbarSeparator/>
						<RaisedButton label="Create Broadcast" primary={true} />
					</ToolbarGroup>
				</Toolbar>

				<h1>material-ui</h1>
				<h2>example project</h2>

				<RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

			</div>
		)
	}
}
