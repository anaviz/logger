
Meteor.publish("logs", function () {
	return Logs.find({}, {
		limit: 1000,
		sort: { createdAt: -1 }
	});
});