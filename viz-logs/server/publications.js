
Meteor.publish("webLogs", function () {
	return WebLogs.find({}, {
		limit: 200,
		sort: { timestamp: -1 }
	});
});

Meteor.publish("receiverLogs", function () {
	return ReceiverLogs.find({}, {
		limit: 200,
		sort: { timestamp: -1 }
	});
});

Meteor.publish("nativeLogs", function () {
	return NativeLogs.find({}, {
		limit: 200,
		sort: { timestamp: -1 }
	});
});