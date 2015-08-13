var filters = [];
var filtersDep = new Tracker.Dependency;


var filterLogs = function(logs) {
	_.each(logs, function(log){
		var logText = log.innerText;
		var containsFilterPattern = _.every(filters, function(filter){
			return logText.indexOf(filter.pattern) !== -1;
		});
		if (containsFilterPattern || filters.length === 0) {
			log.style.display = "block"
		} else {
			log.style.display = "none"
		}
	});
};

var addFilterPattern = function(filterPattern) {
	var filterPatternExists = _.find(filters, function(filter){
		return filter.pattern === filterPattern;
	});
	if (!filterPatternExists) {
		filters.push({pattern: filterPattern});
		filtersDep.changed();
	}
};

var removeFilterPattern = function(filterPattern) {
	var newFiltersList = _.reject(filters, function(filter){
		return filter.pattern === filterPattern;
	});
	filters = newFiltersList;

	filtersDep.changed();
};

//-----------------------------------
// Template Helpers and Events
//-----------------------------------

Template.logs.helpers({
	logs: function () {
		//TODO: handle logId undefined cases
		var logId = Router.current().params.id;
		var collectionName = logId.charAt(0).toUpperCase() + logId.slice(1);
		return window[collectionName].find({}, {sort: {createdAt: -1}, limit: 2000});
	},

	filters: function() {
		filtersDep.depend();
		return filters;
	}
});

Template.logs.events({
	"keypress input.filter-input": function (e) {
		if (e.keyCode === 13) {
			var filterPattern = e.target.value;
			addFilterPattern(filterPattern);

			e.target.value = "";

			var logs = Template.instance().find(".logs").children;
			filterLogs(logs);
		}
	},

	"click .filter .delete": function (e) {
		var filterPattern = e.target.getAttribute("data-filter-pattern") || "";
		removeFilterPattern(filterPattern);

		var logs = Template.instance().find(".logs").children;
		filterLogs(logs);
	}
});