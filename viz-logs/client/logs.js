
Template.logs.helpers({
	logs: function () {
		//TODO: handle logId undefined cases
		var logId = Router.current().params.id;
		var collectionName = logId.charAt(0).toUpperCase() + logId.slice(1);
		return window[collectionName].find({}, {sort: {createdAt: -1}});
	}
});