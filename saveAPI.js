/*jslint node: true*/
"use strict";

var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var jsonParser = bodyParser.json();

var fs = require('fs');
var https = require('https');

app.use('/', express.static(__dirname));
var privateKey  = fs.readFileSync('nginx.key', 'utf8');
var certificate = fs.readFileSync('nginx.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
console.log(credentials);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
		console.log("test");
		console.log("req.body.id=" + req.body.id);
        cb(null, 'app/videos/' + req.body.id + '/')
    },
    filename: function (req, file, cb) {
		//TODO parse mimetype for extension
        cb(null, req.body.fname + ".webm");
  }
});

var upload = multer({ storage: storage });

app.use(jsonParser);
app.use(cors());

app.get('/', function(req, res, next) {
	next();
});

app.post('/upload', upload.single('file'), function (req, res) {
			
	console.log("saveAPI: post to /upload acknowledged");
	console.log(req.body);
	//console.log(req.file);
    //console.log(req.headers);
    //console.log(req.file.filename);

    return res.end();
});

//Templating
//app.use(express.static(__dirname + '/public'));

//Server
//var localPort = process.env.VCAP_APP_PORT || 3000;
/*var localPort = 3001;
http.listen(localPort, function () {
    console.log('saveAPI listening on *:' + localPort);
});*/



// your express configuration here

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(3001, function(){
   	console.log('saveAPI listening on *:3001');
});
