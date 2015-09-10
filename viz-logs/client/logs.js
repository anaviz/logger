//TODO: excluding filtering
//TODO: && , || filtering

var logId;
var logCollectionName;
var clearedLogsTimestamp = new Date(1989,10,21);

var filters = [];
var filtersDep = new Tracker.Dependency;

var logs = [];
var logsDep = new Tracker.Dependency;

//-----------------------------------
// Filter methods
//-----------------------------------

var addFilterPattern = function(filterPattern) {
	if(filterPattern !== "") {
		var filterPatternExists = _.find(filters, function (filter) {
			return filter.pattern === filterPattern;
		});
		if (!filterPatternExists) {
			filters.push({pattern: filterPattern});
			filtersDep.changed();
			logsDep.changed();
		}
	}
};

var removeFilterPattern = function(filterPattern) {
	var newFiltersList = _.reject(filters, function(filter){
		return filter.pattern === filterPattern;
	});
	filters = newFiltersList;

	filtersDep.changed();
	logsDep.changed();
};

//-----------------------------------
// Template Helpers and Events
//-----------------------------------

Template.logs.helpers({
	logs: function () {
		//TODO: make setLogId into a separate function & handle logId undefined cases
		logId = Router.current().params.id;
		logCollectionName = logId.charAt(0).toUpperCase() + logId.slice(1);

		var logsRegexp = new RegExp(_.pluck(filters, "pattern").join("|"), "g");
		logs = window[logCollectionName]
			.find(
			{
				$or: [
					{"message": logsRegexp},
					{"meta.host": logsRegexp},
					{"meta.ip": logsRegexp},
					{"meta.id": logsRegexp},
					{"meta.component": logsRegexp}
				],
				timestamp: { $gte: clearedLogsTimestamp }
			},
			{
				sort: { timestamp: -1 }
			}
		);
		logsDep.depend();
		return logs;
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
		}
	},

	"click .filter .delete": function (e) {
		var filterPattern = e.target.getAttribute("data-filter-pattern") || "";
		removeFilterPattern(filterPattern);
	},

	"click .clear-logs": function (e) {
		clearedLogsTimestamp = new Date();
		logsDep.changed();
	}
});