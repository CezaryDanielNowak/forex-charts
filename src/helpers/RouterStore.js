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
	 * 			'main-page':    '/'
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
		this._handleClicks()
	}

	_handleClicks() {
		document.addEventListener('click', (e) => {
			let element = e.target
			if (element.nodeName === 'A') {
				if (this._dispatch(element.getAttribute('href'))) {
					e.preventDefault()
				}
			}
		})
	}

	/**
	 * Dispatch initial route events on page load.
	 */
	_dispatch(path = this.getPath()) {
		return Object.keys(this._data).some((routeAlias) => {
			let route = this._data[routeAlias]
			if (route instanceof Route) {
				let routeParams = route.match(path)
				if (routeParams !== false) {
					this.route(routeAlias, routeParams, true)
					return true
				}
			}
		})
	}

	set(field, value, silent) {
		value = new Route(value)
		return super.set(field, value, silent)
	}

	getRouteUrl(routeAlias, params = {}) {
		let route = this.get(routeAlias)

		return route.reverse(params)
	}

	route(routeAlias, params = {}, initial = false) {
		let newPath = this.getRouteUrl(routeAlias, params)

		if (newPath === this.getPath()) {
			return
		}

		let routeDetail = {
			route: routeAlias,
			params: params,
			initial: initial
		}
		this.trigger(`route:${routeAlias}`, routeDetail)
		super.set('route', routeDetail)

		this._navigate(newPath, params)
	}

	getPath() {
		return window.location.pathname
	}

	_navigate(path, params) {
		// TODO: IE8 fallback
		window.history.pushState(params, document.title, path)
	}
}
