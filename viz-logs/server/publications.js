
Meteor.publish("testLogs", function () {
	return TestLogs.find();
});

Meteor.publish("receiverLogs", function () {
	return TestLogs.find();
});

Meteor.publish("nativeLogs", function () {
	return TestLogs.find();
});