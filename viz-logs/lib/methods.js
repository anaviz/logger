/*
* EXAMPLE:
*/

//Meteor.methods({
//	addEvent: function (title) {//
//		//if (! Meteor.userId()) {
//		//	throw new Meteor.Error("not-authorized");
//		//}
//		var userId = Meteor.userId() ? Meteor.userId() : "Anonymous";
//		var userName = Meteor.user() ? Meteor.user().username : "Anonymous";
//
//		Events.insert({
//			start: new Date().getTime(),
//			content: "",
//			tags:[],
//			title: title,
//			createdAt: new Date(),
//			position: { lat: -34.397, lng: 150.644 },
//			owner: userId,
//			username: userName
//		});
//	},
//
//	deleteEvent: function (eventId) {
		//var event = Events.findOne(eventId);
		//if (event.owner !== Meteor.userId()) {
		//	throw new Meteor.Error("not-authorized");
		//}
		//Events.remove(eventId);
//	}
//});