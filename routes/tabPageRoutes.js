var express = require('express');
var router = express.Router();
var fs = require('fs');

router.put('/:name', function save(req, res) {
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

module.exports = router;
