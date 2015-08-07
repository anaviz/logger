
Template.logs.helpers({
	testlogs: function () {
		return TestLogs.find({}, {sort: {createdAt: -1}});
	}
});