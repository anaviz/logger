var express = require('express');
var winston = require('winston');
var mongodb = require('winston-mongodb').MongoDB; //Requiring 'winston-mongodb' will expose 'winston.transports.MongoDB'
var cors = require('cors');

//var https = require('https');
//var http = require('http');
//var fs = require('fs');

var config = {
	mongodbUrl: "mongodb://localhost:27017/logsDB",
	capped: true,
	cappedSize: 1000000
};

//----- f

var webLogOptions = {
	name: "web-logs",
	db : config.mongodbUrl,
	collection: 'webLogs',
	capped: config.capped,
	cappedSize: config.cappedSize
};

var testLogger = new (winston.Logger)({
	transports: [
		new winston.transports.MongoDB(webLogOptions)
	]
});

var receiverLogOptions = {
	name: "receiver-logs",
	db : config.mongodbUrl,
	collection: 'receiverLogs',
	capped: config.capped,
	cappedSize: config.cappedSize
};

var receiverLogger = new (winston.Logger)({
	transports: [
		new winston.transports.MongoDB(receiverLogOptions)
	]
});

var nativeLogOptions = {
	name: "native-logs",
	db : config.mongodbUrl,
	collection: 'nativeLogs',
	capped: config.capped,
	cappedSize: config.cappedSize
};

var nativeLogger = new (winston.Logger)({
	transports: [
		new winston.transports.MongoDB(nativeLogOptions)
	]
});

//----- f

var app = express();
//app.use(express.bodyParser());
var port = process.env.PORT || 9002;

var corsOptions = {
	origin: '*'
};
app.use(cors(corsOptions));

//----- f

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/web-log', function (req, res) {
	console.log("log: "+ req.query.msg);

	var msg = req.query.msg || "";
	var meta = {
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		host: req.headers['host'] || "",
		id: req.query.id || "",
		component: "web"
	};
	meta.all = msg + meta.ip + meta.host + meta.id + meta.component;

	testLogger.info(msg , meta);
	res.send('Success');
});

app.get('/receiver-log', function (req, res) {
	console.log("log: "+ req.query.msg);

	var msg = req.query.msg || "";
	var meta = {
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		host: req.headers['host'] || "",
		id: req.query.id || "",
		component: "receiver"
	};
	meta.all = msg + meta.ip + meta.host + meta.id + meta.component;

	receiverLogger.info(msg , meta);
	res.send('Success');
});

app.get('/native-log', function (req, res) {
	console.log("log: "+ req.query.msg);

	var msg = req.query.msg || "";
	var meta = {
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		host: req.headers['host'] || "",
		id: req.query.id || "",
		component: "native"
	};
	meta.all = msg + meta.ip + meta.host + meta.id + meta.component;

	nativeLogger.info(msg , meta);
	res.send('Success');
});

//----- f

// This line is from the Node.js HTTPS documentation.
//var options = {
//	key: fs.readFileSync('/etc/ssl/wildcard.noriginmedia.com.key'),
//	cert: fs.readFileSync('/etc/ssl/wildcard.noriginmedia.com.chain.pem')
//};

//Create a service (the app object is just a callback).
//Create an HTTP service.
//http.createServer(app).listen(9002);
app.listen(port, function() {
	console.log('Listening on port ' + port)
})

// // Create an HTTPS service identical to the HTTP service.
//https.createServer(options, app).listen(8443);