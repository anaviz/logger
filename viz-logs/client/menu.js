
Template.menu.events({
	"click .menu-icon": function () {
		var menu = Template.instance().find(".menu");
		menu.classList.add("opened");
	},

	"click .underlay": function () {
		var menu = Template.instance().find(".menu");
		menu.classList.remove("opened");
	}
});