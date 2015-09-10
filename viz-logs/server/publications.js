//TODO: sort by date and limit

Meteor.publish("webLogs", function () {
	return WebLogs.find({});
});

Meteor.publish("receiverLogs", function () {
	return ReceiverLogs.find({});
});

Meteor.publish("nativeLogs", function () {
	return NativeLogs.find({}, {sort:  { $natural: -1 }});
});