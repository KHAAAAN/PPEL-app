var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();

var updateTapPage = require('./routes/tabPageRoutes');
var fs = require("fs");

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/tabpages', updateTapPage);

app.put('/tabpages/:name', function update(req, res) {
  var filename = "client/app/tab_content/tabpages.json";

  // Get content from file
  var contents = fs.readFileSync(filename);
  // Define to JSON type
  var jsonContent = JSON.parse(contents);

  var foundAndProcessed = false;

  var tabContent = req.body.tab_content;

  for(var i = 0; i < jsonContent.Pages.length; i++){
    if(jsonContent.Pages[i].Title == req.params.name){
      jsonContent.Pages[i].Content = tabContent;
      foundAndProcessed = true;
      break;
    }
  }

  var newJsonString = JSON.stringify(jsonContent);

  fs.writeFile(filename, newJsonString, err => {
    if (err) throw err;
    console.log('saved!');
  });

  return res.status(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
