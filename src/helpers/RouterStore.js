import EventedStore from './EventedStore'
import Route from 'route-parser'

export default class RouterStore extends EventedStore {
	/**
	 * Store for handling navigation
	 * - provide routes and aliases to refer internally
	 * https://github.com/rcs/route-parser is used internally
	 *
	 * Sample usage:
	 * 		// initialize router with routes
	 * 		let router = new RouterStore({
	 * 			'dashboard':    '/dashboard',
	 * 			'user-list':    '/user',
	 * 			'user-detail':  '/user/:user',
	 * 			'nested-path':  '/nested/:paramA/:paramB',
	 * 			'main-page':    ''
	 * 		})
	 *   	// add custom route
	 * 		router.set('test-page', '/test-test-test')
	 *
	 * 		router.on('route:main-page', function() {
	 * 			// route changed to main-page
	 * 		})
	 *
	 * 		router.on('route:user-detail', function(routeDetail) {
	 * 			// route changed to user-detail.
	 * 			// routeDetail:
	 * 			//   {route: 'user-detail', params: {user: '...'}, initial: true}
	 * 			//   initial is true just for first page load/refresh with given URL
	 * 		})
	 *
	 * 		router.on('route', function(routeDetail) {
	 * 			// callback for any route change
	 * 		})
	 *
	 * 		// route to /user/CezaryDanielNowak
	 * 		router.route('user-detail', {user: "CezaryDanielNowak"})
	 *
	 *
	 * 		router.get('route') // get current route in following format:
	 * 		                    // url: /nested/12/fooBar
	 * 							// {route: 'nested-path', params: {paramA: '12', paramB: 'fooBar'}}
	 *
	 */
	constructor(routes) {
		super() // don't pass routes!

		if (routes) {
			Object.keys(routes).forEach((routeAlias) => {
				this.set(routeAlias, routes[routeAlias], true)
			})
		}

		this._dispatch()
	}

	_dispatch() {
		let path = this.getPath()
		Object.keys(this._data).some((routeAlias) => {
			let route = this._data[routeAlias]
			if (route instanceof Route) {
				let matchRoute = route.match(path)
				if (matchRoute !== false) {
					// TU MI PRZERWANO
				}
			}
		})
		this.route()
	}

	set(field, value, silent) {
		value = new Route(value)
		return super.set(field, value, silent)
	}

	route(routeAlias, params = {}, initial = false) {
		let route = this.get(routeAlias)

		let newPath = route.reverse(params)
		let oldPath = this.getPath()

		if (newPath === oldPath) {
			return
		}

		this.navigate(newPath, params)
		let routeDetail = {
			route: routeAlias,
			params: params,
			initial: initial
		}
		this.set('route', routeDetail)
		this.trigger(`route:${routeAlias}`, routeDetail)
	}

	getPath() {
		return window.location.pathname
	}

	navigate(path, params) {
		window.history.pushState(params, document.title, path)
	}
}
