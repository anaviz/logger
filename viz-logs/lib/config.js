Meteor.appConfig = {
	logComponents: [
		{
			id: "all",
			componentId: "", // leave empty for log filtering to show all
			title: "All"
		},
		{
			id: "web",
			componentId: "web", // id and componentId need to match
			title: "Web"
		},
		{
			id: "receiver",
			componentId: "receiver", // id and componentId need to match
			title: "Receiver"
		},
		{
			id: "native",
			componentId: "native", // id and componentId need to match
			title: "Native"
		}
	]
};