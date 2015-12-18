var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require("./http-helpers");
var fs = require("fs");
var request = require('request');
var url;

archive.readListOfUrls(function(chunk) {
  archive.isUrlInList(chunk, function(data) {
    archive.downloadUrls(chunk);
  });
});

fs.readdir("../web/archives/sites", function(err, files) {
  console.log(files);
});
// require more modules/folders here!/

var actions = {
  "GET": function(req, res) {
    res.writeHead(httpHelper.headers);
    fs.readFile("./public/index.html", function(err, content) {
      res.write(content);
      res.end();
    });
  },
  "POST": function(req, res) {
    var stream;
    req.on('data', function(data) {
      url = data.toString().split('=')[1] + "\n";
      stream = fs.appendFile('./archives/sites.txt', url, function(err) {
        if (err) {
          throw err;
        }
      });
    });
    res.writeHead(httpHelper.headers);
    //request('http://www.google.com').pipe(fs.createWriteStream('./archives/sites/www.google.com'));
    res.end("POSTED");
  },
  "OPTIONS": function(req, res) {
    res.writeHead(httpHelper.headers);
    res.end();
  }

};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  action(req, res);
};
