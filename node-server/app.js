var express = require('express');
var winston = require('winston');
var mongodb = require('winston-mongodb').MongoDB; //Requiring 'winston-mongodb' will expose 'winston.transports.MongoDB'
var cors = require('cors');

var config = {
	mongodbUrl: "mongodb://10.0.18.214:27017/logsDB"
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

app.get('/web-log', function (req, res) {
	console.log("log: "+ req.query.msg);
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var host = req.headers['host'] || "";
	// TODO: add host to winston parameter
	testLogger.info(req.query.msg);
	res.send('Success');
});

app.get('/receiver-log', function (req, res) {
	console.log("log: "+ req.query.msg);
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var host = req.headers['host'] || "";

	receiverLogger.info(req.query.msg);
	res.send('Success');
});

app.get('/native-log', function (req, res) {
	console.log("log: "+ req.query.msg);
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var host = req.headers['host'] || "";
	// TODO: get ... from native msg and add winston parameter

	nativeLogger.info(req.query.msg);
	res.send('Success');
});

//----- f


app.listen(9002);
console.log("App running, port: 9002");