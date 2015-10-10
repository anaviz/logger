
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
	//TODO: select active element, iron router?
	//var menuElements = Template.instance().find("#menu").children;
	//var activeElement = ?;
	//activeElement.classList.add("active");
};