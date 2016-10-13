'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _statusCodes = require('../utils/statusCodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function update(req, res, next) {
  var attrs = req.body;

  //req.param.id
  var filename = "client/app/tab_content/tabpages.json";

  console.log("in update");

  // Get content from file
  var contents = _fs2.default.readFileSync(filename);
  // Define to JSON type
  var jsonContent = JSON.parse(contents);

  //var pages = jsonContent.Pages;
  var foundAndProcessed = false;

  for (var i = 0; i < jsonContent.Pages.length; i++) {
    if (jsonContent.Pages[i].Title == req.params.id) {
      jsonContent.Pages[i].Content = JSON.parse(req.body).tab_content;
      foundAndProcessed = true;
      break;
    }
  }

  if (foundAndProcessed == false) {
    return next((0, _statusCodes.unprocessableEntity)());
  }

  _fs2.default.writeFile(fileName, jsonContent);

  return res.status(200);
}

module.exports = {
  update: update
};

//# sourceMappingURL=tabPageController-compiled.js.map