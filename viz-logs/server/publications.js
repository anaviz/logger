
Meteor.publish("testLogs", function () {
	return TestLogs.find();
});