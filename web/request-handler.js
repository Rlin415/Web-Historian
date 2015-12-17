var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require("./http-helpers");
var fs = require("fs");
// require more modules/folders here!

var actions = {
  "GET": function(req, res) {
    res.writeHead(httpHelper.headers);
    fs.readFile("./public/index.html", function(err, content) {
      res.write(content);
      res.end("Hello, World");
    });    
  },
  "POST": function(req, res) {
    res.writeHead(httpHelper.headers);
    res.end(200);
  },
  "OPTIONS": function(req, res) {
    res.writeHead(httpHelper.headers);
    res.end(200);
  }
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  action(req, res);
};
