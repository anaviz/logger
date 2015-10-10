Meteor.methods({
	addLog: function (data) {
		Logs.insert({
			msg: data.msg,
			component: data.component,
			id: data.id,
			createdAt: data.createdAt,
			ip: data.ip,
			host: data.host,
			all: data.msg + data.component + data.id + data.ip + data.host
		});
	}
});


/*
* EXAMPLE:
*/

//	deleteEvent: function (eventId) {
		//var event = Events.findOne(eventId);
		//if (event.owner !== Meteor.userId()) {
		//	throw new Meteor.Error("not-authorized");
		//}
		//Events.remove(eventId);
//	}
