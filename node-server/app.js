var express = require('express');
var winston = require('winston');
var mongodb = require('winston-mongodb').MongoDB; //Requiring 'winston-mongodb' will expose 'winston.transports.MongoDB'
var cors = require('cors');

//var https = require('https');
//var http = require('http');
//var fs = require('fs');

var config = {
	mongodbUrl: "mongodb://192.168.1.4:27017/logsDB"
};

//----- f

var webLogOptions = {
	name: "web-logs",
	db : config.mongodbUrl,
	collection: 'webLogs'
};

var testLogger = new (winston.Logger)({
	transports: [
		new winston.transports.MongoDB(webLogOptions)
	]
});

var receiverLogOptions = {
	name: "receiver-logs",
	db : config.mongodbUrl,
	collection: 'receiverLogs'
};

var receiverLogger = new (winston.Logger)({
	transports: [
		new winston.transports.MongoDB(receiverLogOptions)
	]
});

var nativeLogOptions = {
	name: "native-logs",
	db : config.mongodbUrl,
	collection: 'nativeLogs'
};

var nativeLogger = new (winston.Logger)({
	transports: [
		new winston.transports.MongoDB(nativeLogOptions)
	]
});

//----- f

var app = express();
//app.use(express.bodyParser());

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
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var host = req.headers['host'] || "";
	var msg = req.query.msg || "";
	var id = req.query.id || "";

	testLogger.info(msg , { ip: ip, host: host , id: id, component: "web"});
	res.send('Success');
});

app.get('/receiver-log', function (req, res) {
	console.log("log: "+ req.query.msg);
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var host = req.headers['host'] || "";
	var msg = req.query.msg || "";
	var id = req.query.id || "";

	receiverLogger.info(msg , { ip: ip, host: host , id: id, component: "receiver"});
	res.send('Success');
});

app.get('/native-log', function (req, res) {
	console.log("log: "+ req.query.msg);
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var host = req.headers['host'] || "";
	var msg = req.query.msg || "";
	var id = req.query.id || "";

	nativeLogger.info(msg , { ip: ip, host: host , id: id, component: "native"});
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
app.listen(9002);
// // Create an HTTPS service identical to the HTTP service.
//https.createServer(options, app).listen(8443);

console.log("App running, port: 9002");