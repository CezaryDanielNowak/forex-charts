import React from 'react'
import ForexValuesButtons from 'components/ForexValuesButtons'
import RouterStore from 'helpers/RouterStore'


export default class MainPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSidebarOpen: true
		}
		/* eslint-disable */
		this.router = new RouterStore({
			'dashboard':    '/dashboard',
			'user-list':    '/user',
			'user-detail':  '/user/:user',
			'nested-path':  '/nested/:paramA/:paramB',
			'main-page':    '/'
		})
		/* eslint-enable */
	}

	toggleState(stateField, e) {
		e.preventDefault()
		let newState = {}
		newState[stateField] = !this.state[stateField]
		this.setState(newState)
	}

	render() {
		let state = this.state
		return (
			<div id="page-wrapper" className={state.isSidebarOpen ? 'open' : ''}>
				<div id="sidebar-wrapper">
					<ul className="sidebar">
						<li className="sidebar-main">
							<a href="#" onClick={this.toggleState.bind(this, 'isSidebarOpen')}>
								Dashboard
								<span className="menu-icon glyphicon glyphicon-transfer"></span>
							</a>
						</li>
						<li className="sidebar-title"><span>NAVIGATION</span></li>
						<li className="sidebar-list">
							<a href="#">Dashboard <span className="menu-icon fa fa-tachometer"></span></a>
						</li>
					</ul>
					<div className="sidebar-footer">
						<div className="col-xs-4">
							<a href="https://github.com/rdash/rdash-barebones" target="_blank">
								Github
							</a>
						</div>
						<div className="col-xs-4">
							<a href="#" target="_blank">
								About
							</a>
						</div>
						<div className="col-xs-4">
							<a href="#">
								Support
							</a>
						</div>
					</div>
				</div>


				<div id="content-wrapper">
					<div className="page-content">
						<div className="row header">
							<div className="col-xs-12">
								<div className="user pull-right">
									{/*
									<div className="item dropdown">
											<a href="#" className="dropdown-toggle">
												<i className="fa fa-eur" key="eur"></i>
												<i className="fa fa-inr" key="inr"></i>
												<i className="fa fa-jpy" key="jpy"></i>
												<i className="fa fa-try" key="try"></i>
												<i className="fa fa-rub" key="rub"></i>
												<i className="fa fa-ils" key="ils"></i>
												<i className="fa fa-usd" key="usd"></i>
												<i className="fa fa-gbp" key="gbp"></i>
												<i className="fa fa-krw" key="krw"></i>
												<i className="fa fa-money" key="money"></i>
											</a>

										<ul className="dropdown-menu dropdown-menu-right">
											<li className="dropdown-header">
												Joe Bloggs
											</li>
											<li className="divider"></li>
											<li className="link">
												<a href="#">
													Profile
												</a>
											</li>
											<li className="link">
												<a href="#">
													Menu Item
												</a>
											</li>
											<li className="divider"></li>
											<li className="link">
												<a href="#">
													Logout
												</a>
											</li>
										</ul>
									</div>
									*/}
									<div className="item dropdown">
										<a href="#" className="dropdown-toggle" data-toggle="dropdown">
											<i className="fa fa-bell-o"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-right">
											<li className="dropdown-header">
												Notifications
											</li>
											<li className="divider"></li>
											<li>
												<a href="#">Nothing here...</a>
											</li>
										</ul>
									</div>

									<div className="item dropdown">
										<a href="#" className="dropdown-toggle" data-toggle="dropdown" title="Select value">
											<i className="fa fa-money"></i>
										</a>
										<ForexValuesButtons className="dropdown-menu dropdown-menu-right">
											<li className="dropdown-header">
												Switch currency
											</li>
											<li className="divider"></li>
										</ForexValuesButtons>
									</div>

								</div>
								<div className="meta">
									<div className="page">
										Dashboard
									</div>
									<div className="breadcrumb-links">
										<a href={this.router.getRouteUrl('main-page')}>Home</a> / <a href={this.router.getRouteUrl('dashboard')}>Dashboard</a>
									</div>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-xs-12">
								<div className="widget">
									<div className="widget-body">
										Get started!
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
