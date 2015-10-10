//TODO: excluding filtering
//TODO: !! JSON beautifying with expanding view

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
		var logComponentId = Router.current().params.componentId || "";

		var logComponentRegExp = new RegExp(logComponentId, "g");
		var logFilterRegExp = getLogFilterRegExp();

		Tracker.autorun(function() {
			logs = Logs.find(
				{
					component: logComponentRegExp,
					all: logFilterRegExp,
					createdAt: { $gte: fromDate }
				},
				{
					sort: { createdAt: -1 }
				}
			);
		});
		logsDep.depend();
		return logs;
	},

	filters: function() {
		filtersDep.depend();
		return filters;
	},

	diffComponents: function() { // Differentiates components logs by adding a css class whenever logs are not filtered by component id
		var logComponentId = Router.current().params.componentId;
		return logComponentId ? "" : "dif-components";
	}
});

Template.logs.events({
	"keypress input.filter-input": function (e) {
		if (e.keyCode === 13) {
			var filterPattern = e.target.value;
			addFilterPattern(filterPattern.toLowerCase());

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