import fs from 'fs';
import { notFound, unprocessableEntity } from '../utils/statusCodes';

function update(req, res) {

  var filename = "client/app/tab_content/tabpages.json";

  // Get content from file
  var contents = fs.readFileSync(filename);
  // Define to JSON type
  var jsonContent = JSON.parse(contents);

  //var pages = jsonContent.Pages;
  var foundAndProcessed = false;

  for(var i = 0; i < jsonContent.Pages.length; i++){
    if(jsonContent.Pages[i].Title == req.params.id){
      jsonContent.Pages[i].Content = JSON.parse(req.body).tab_content;
      foundAndProcessed = true;
      break;
    }
  }

  if(foundAndProcessed == false){
    return next(unprocessableEntity());
  }

  fs.writeFile(fileName, jsonContent);

  return res.status(200);

}

module.exports = {
  update
};
