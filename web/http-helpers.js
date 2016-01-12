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

exports.sendRedirect = function(res, location, status) {
  status = status || 302;
  res.writeHead(status, {Location: location});
  res.end();
};

exports.sendResponse = function(res, obj, status) {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(obj);
};

exports.collectData = function(req, callback) {
  var data = '';

  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    callback(data);
  });
};

exports.send404 = function(res) {
  exports.sendResponse(res, '404: Page not found', 404);
};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf8'};
  var readFile = Q.denodeify(fs.readFile);

  readFile(archive.paths.siteAssets + asset, encoding)
    .then(function(contents) {
      if (contents) exports.sendResponse(res, contents);
    }, function(err) {
      return readFile(archive.paths.archivedSites + asset, encoding);
    })
    .then(function(contents) {
      if (contents) exports.sendResponse(res, contents);
    }, function(err) {
      callback ? callback(): exports.send404(res);
    });
};
