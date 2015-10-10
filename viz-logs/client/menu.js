
Template.menu.helpers({
	items: function () {
		return Meteor.appConfig.logComponents;
	}
});

Template.menu.events({
	"click .menu-icon": function () {
		//Open menu
		var menu = Template.instance().find(".menu");
		menu.classList.add("opened");
	},

	"click .underlay": function () {
		//Close menu
		var menu = Template.instance().find(".menu");
		menu.classList.remove("opened");
	},

	"click .nav-item": function (e) {
		//Select clicked menu item, deselect other menu items
		var activeElement = e.target;
		var menuElements = Template.instance().find("#menu").children;
		_.each(menuElements, function (menuElement) {
			menuElement.classList.remove("active");
		});
		activeElement.classList.add("active");

		//Close menu
		var menu = Template.instance().find(".menu");
		menu.classList.remove("opened");
	}
});

Template.menu.rendered = function() {
	var logComponentId = Router.current().params.componentId;

	var activeElement;
	if (logComponentId) {
		activeElement = Template.instance().find("#" + logComponentId);
	} else {
		activeElement = Template.instance().find("#all");
	}

	activeElement.classList.add("active");
};