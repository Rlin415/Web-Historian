// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require("../helpers/archive-helpers");

var arhciver = function(chunk){

  fs.readdir("../web/archives/sites", function(err, files) {
    files.forEach(function(file) {
      if (file === chunk) {

      }else{
        request('http://' + chunk).pipe(fs.createWriteStream('./archives/sites/' + chunk));
      }

    });
  });


};
