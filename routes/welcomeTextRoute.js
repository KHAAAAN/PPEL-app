var express = require('express');
var router = express.Router();
var fs = require('fs');

router.put('/', function update(req, res) {
  var filename = "client/app/home/welcome.json";

  var s = JSON.stringify(req.body);

  fs.writeFile(filename, s, err => {
    if (err) throw err;
    console.log('saved!');
  });

  return res.status(200);
});

module.exports = router;