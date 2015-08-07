
Meteor.subscribe("testLogs");
Meteor.subscribe("userData");


// GLOBAL HELPERS
//--------------------------------

Template.registerHelper('formatDate', function(date) {
	return moment(date).format('DD/MM/YYYY, HH:mm:ss');
});


// other examples
//--------------------------------

//Template.body.helpers({
	// Use Session to store just-one-time-session info
	//someName: function () {
	//	return Session.get("someName");
	//}
//});

//Accounts.ui.config({
//	passwordSignupFields: "USERNAME_ONLY"
//});

//Meteor.startup(function(){
	//require.config({
	//	paths: {
	//		vis: 'client/requireLibraries/vis'
	//	}
	//});

	//require(["main"]);
//});