
Router.route('/', function () {
	this.render('logs');
});

Router.route('/logs', function () {
	this.render('logs');
});

Router.route('/logs/:componentId', function () {
	this.render('logs');
});


//-----------------------------
// Server
//-----------------------------

if(Meteor.isServer) {
	WebApp.connectHandlers.use(function (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return next();
	});
}

Router.route('/log', function (req) {
	var queryData = req.query || {};
	var headersData = req.headers || {};

	var data = {
		msg: queryData.msg || "",
		component: queryData.component || "",
		id: queryData.id || "",
		createdAt: new Date(),
		ip: headersData['x-forwarded-for'] || "",
		host: headersData.host || ""
	}
	Meteor.call("addLog", data);

	this.response.end('success');
}, {where: 'server'});


//-----------------------------
// Examples
//-----------------------------

// https://github.com/EventedMind/iron-router/tree/devel/examples