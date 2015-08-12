var filters = [];


Template.logs.helpers({
	logs: function () {
		//TODO: handle logId undefined cases
		var logId = Router.current().params.id;
		var collectionName = logId.charAt(0).toUpperCase() + logId.slice(1);
		return window[collectionName].find({}, {sort: {createdAt: -1}, limit: 2000});
	}
});

//TODO: filter!

Template.logs.events({
	"keypress input.filter": function (e) {
		if (e.keyCode === 13) {
			var filterPatern = e.target.value;
			filters.push(filterPatern);

			// TODO: create visual element filterPatern and empty filter input
			e.target.value = "";

			// TODO: create filter method
			var logs = Template.instance().find(".logs").children;
			_.each(logs, function(log){
				var logText = log.innerText;
				var containsFilterPattern = _.every(filters, function(filter){
					return logText.indexOf(filter) !== -1;
				});
				if (containsFilterPattern || filters.length === 0) {
					log.style.display = "block"
					// TODO: highlight filter pattern
				} else {
					log.style.display = "none"
				}
			});
		}
	},

	"click .filter-pattern.delete": function (e) {
		var filterPattern = e.target.value;
		var index = filters.indexOf(filterPattern);
		if (index > -1) {
			filters.splice(index, 1);
		}
		// TODO: call filter()
	}
});