/*jslint node: true*/
"use strict";

var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var upload = multer({ dest: 'uploads/' });
var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(cors());

app.get('/', function(req, res, next) {
	next();
});

app.post('/upload', upload.single('file'), function (req, res) {
	//console.log(req);
	console.log(req.file);
    //console.log(req.headers);
    //console.log(req.file.filename);

    return res.end();
});

//Templating
app.use(express.static(__dirname + '/public'));

//Server
//var localPort = process.env.VCAP_APP_PORT || 3000;
var localPort = 3001;
http.listen(localPort, function () {
    console.log('Listening on *:' + localPort);
});
