"use strict";

var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var jsonParser = bodyParser.json();
var httpModule = require('http');

app.use(jsonParser);
app.use(cors());

app.get('/', function(req, res, next) {
	next();
});


app.get('/test', function(req, res){
	res.send("testing");
});

app.get('/wsu_request', function(req, res){
	console.log('request to wsu_request acknowledged');
	var options = {
		host: 'localhost',
		port:3002,
		path:'/test'
	  	//port: 1337,
		//path: '/secure.wsu.edu/login-server/auth-validate.asp?session_id=%7BEF15982F-544E-4B1B-92FE-2C226824E214%7D&client_address=69.76.16.248'

	};

	var req2 = httpModule.request(options, function(resp){
		var data = "";
		//console.log(resp);
		console.log('STATUS: ' + resp.statusCode);
		console.log('HEADERS: ' + JSON.stringify(resp.headers));
		resp.on('data', function(chunk){
		//do something with chunk
		console.log(chunk);
		data += chunk;
		});

		resp.on('end', function () {
              console.log("data = " + data);
        });

	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	}).end();

});

//Templating
app.use(express.static(__dirname + '/public'));

//Server
//var localPort = process.env.VCAP_APP_PORT || 3000;
var localPort = 3002;
http.listen(localPort, function () {
    console.log('CORS proxy listening on *:' + localPort);
});


