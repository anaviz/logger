//TODO: excluding filtering

var logId;
var logCollectionName;
var fromDate = new Date(1989,10,21);
var filteringOperator = "and"; // "and" or "or" for the regular expression

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

var getLogFilterRegExp = function() {
	var filtersList = _.pluck(filters, "pattern");
	if (filteringOperator === "or") {
		return new RegExp(filtersList.join("|"), "g");
	} else {
		return new RegExp("(?=.*" + filtersList.join(".*)(?=.*") + ".*).*", "g");
	}

};

//-----------------------------------
// Template Helpers, Events, Rendered
//-----------------------------------

Template.logs.helpers({
	logs: function () {
		//TODO: make setLogId into a separate function & handle logId undefined cases
		logId = Router.current().params.id;
		logCollectionName = logId.charAt(0).toUpperCase() + logId.slice(1);

		var logFilterRegExp = getLogFilterRegExp();

		Tracker.autorun(function() {
			logs = window[logCollectionName]
				.find(
				{
					"meta.all": logFilterRegExp,
					timestamp: { $gte: fromDate }
				},
				{
					sort: { timestamp: -1 }
				}
			);
		});
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

	"click .switcher .switcher-option": function (e) {
		filteringOperator = e.target.getAttribute("data-switcher-option") || "";

		var activeElement = e.target;
		var switcherOptions = Template.instance().find(".filter-operators.switcher").children;
		_.each(switcherOptions, function(switcherOption){
			switcherOption.classList.remove("active");
		});
		activeElement.classList.add("active");

		logsDep.changed();
	},

	"click .clear-logs": function (e) {
		fromDate = new Date();
		logsDep.changed();
	}
});