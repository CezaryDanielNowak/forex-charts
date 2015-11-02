import React from 'react'
import _ from 'lodash'

export default class BaseComponent extends React.Component {

	getClassNameString(classNameAddon) {
		if (_.isPlainObject(classNameAddon)) {
			// pick non-falsy elements in the object.
			classNameAddon = _.keys(_.pick(classNameAddon, _.identity))
		}
		if (_.isArray(classNameAddon)) {
			classNameAddon = classNameAddon.join(' ')
		}

		return classNameAddon
	}

	getClassName() {
		/**
		 * @description
		 *     getClassName joins all possible classNames used in the component
		 *     - passing className prop
		 *     - component class className field
		 *     - support className provided in getClassName arguments...
		 *     - when object is passed, works the same as React.addons.classSet
		 *
		 * @argumens List of Strings / Arrays / Objects
		 *
		 * @example
		 *     className: "PrettyWidget"
		 *     render: function() {
		 *       var classes = this.getClassName({
		 *         classA: true,
		 *         classB: false
		 *       });
		 *       return <div className={classes}>...</div> // outputs "classA PrettyWidget"
		 *     }
		 *
		 * @returns {String} [description]
		 */
		var classNameAddon = _.map(arguments, this.getClassNameString).join(' ')
		return `${classNameAddon} ${this.props.className || ''} ${this.className || ''}`
	}
}


