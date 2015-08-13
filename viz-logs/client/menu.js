
Template.menu.helpers({
	items: function () {
		return Meteor.appConfig.logCollections;
	}
});

Template.menu.events({
	"click .menu-icon": function () {
		var menu = Template.instance().find(".menu");
		menu.classList.add("opened");
	},

	"click .underlay": function () {
		var menu = Template.instance().find(".menu");
		menu.classList.remove("opened");
	},

	"click .nav-item": function (e) {
		var activeElement = e.target;
		var menuElements = Template.instance().find("#menu").children;
		_.each(menuElements, function (menuElement) {
			menuElement.classList.remove("active");
		});
		activeElement.classList.add("active");
	}
});

Template.menu.rendered = function() {
	//TODO: select active element, iron router?
	//var menuElements = Template.instance().find("#menu").children;
	//var activeElement;
	//activeElement.classList.add("active");
};