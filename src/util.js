export default {
	showProgress(element, show/* , XHR */) {
		/*
		 * Show progress indicator for domNode or whole document
		 * @param {domNode}
		 * target domNode. Pointer-events will be disabled
		 * @param {boolean}
		 * show or hide. Undefined means toggle.
		 * @param {Object}
		 * XHR to take progress indication.
		 * @example
		 * util.showProgress(element); //show
		 * util.showProgress(element, false); //hide
		 * util.showProgress(); //show on body
		 * util.showProgress(false); //hide on body
		 * @returns {undefined}
		 */
		if (_.isBoolean(element) || arguments.length === 0) {
			show = element
			element = document.body
		}
		console.assert(_.isElement(element), 'showProgress needs a dom element.', element)
		show = show !== false

		let animCounter = 1 * element.getAttribute('data-anim-counter') || 0
		animCounter = animCounter + (show ? 1 : -1)
		element.setAttribute('data-anim-counter', animCounter)

		let action = !show && animCounter === 0 ? 'remove' : 'add'
		element.classList[action]('is-loading')
	}
}
