var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Q = require('q');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var actions = {
   "GET": function(req, res) {
    res.writeHead(404,headers.headers);
    res.end();
  },
  "POST": function(req, res) {
    res.writeHead(404, headers.headers);
    res.end();
  },
  "OPTIONS": function(req, res) {
    res.writeHead(404, headers.headers);
    res.end();
  }
};

exports.serveAssets = function(req, res) {
  var action = actions[req.method];
  action(req, res);
};



// As you progress, keep thinking about what helper functions you can put here!
