Meteor.event = function Event() {
	return {
		handlers: [],

		add: function(handler, context) {
			if (typeof handler !== "function") {
				throw new Error("Handler is not a function.");
			}
			/*
			 * Optimization: integer-indexed array instead of string-indexed
			 * object
			 */
			this.handlers.push([handler, context]);
		},

		remove: function(handler, context) {
			for (var i = this.handlers.length - 1; i >= 0; i--) {
				if (this.handlers[i][0] === handler && this.handlers[i][1] === context) {
					this.handlers.splice(i, 1);
				}
			}
		},

		trigger: function() {
			var handlers = this.handlers.slice();
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i][0].apply(handlers[i][1], arguments);
			}
		}
	}
};