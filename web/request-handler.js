var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require("./http-helpers");
var url = require('url');

var getSite = function(req, res) {
  var urlPath = url.parse(req.url).pathname;

  if (urlPath === '/') urlPath = '/index.html';

  httpHelper.serveAssets(res, urlPath, function() {

    if (urlPath[0] === '/') urlPath = url.Path.slice(1);

    archive.isUrlInList(urlPath.slice(1), function(found) {
      if (found) {
        httpHelper.sendRedirect(res, '/loading.html');
      } else {
        httpHelper.send404(res);
      }
    });
  });
};

var saveSite = function(req, res) {
  httpHelper.collectData(req, function(data) {
    var url = data.split('=')[1];
    archive.isUrlInList(url, function(found) {
      if (found) {
        archive.isUrlArchived(url, function(exists) {
          if (exists) {
            httpHelper.sendRedirect(res, '/' + url);
          } else {
            httpHelper.sendRedirect(res, '/loading.html');
            archive.downloadUrls([url]);
          }
        });
      } else {
        archive.addUrlToList(url, function() {
          httpHelper.sendRedirect(res, '/loading.html');
        });
      }
    });
  });
};

var actions = {
  'GET': getSite,
  'POST': saveSite
};

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];

  if (handler) {
    handler(req, res);
  } else {
    httpHelper.send404(res);
  }
};
