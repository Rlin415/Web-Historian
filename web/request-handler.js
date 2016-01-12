var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require("./http-helpers");
var url = require('url');

var getSite = function(req, res) {
  var urlPath = url.parse(req.url).pathname;

  if (urlPath === '/') urlPath = '/index.html';

  helpers.serveAssets(response, urlPath, function() {

    if (urlPath[0] === '/') urlPath = url.Path.slice(1);

    archive.isUrlInList(urlPath, function(found) {
      if (found) {
        helpers.sendRedirect(response, '/loading.html');
      } else {
        helpers.send404(response);
      }
    });
  });
};

var saveSite = function(req, res) {
  helpers.collectData(req, function(data) {
    var url = JSON.parse(data).url.replace('http://', '');

    archive.isUrlInList(url, function(found) {
      if (found) {
        archive.isUrlArchived(url, function(exists) {
          if (exists) {
            helpers.sendRedirect(res, '/' + url);
          } else {
            helpers.sendRedirect(res, '/loading.html');
          }
        });
      } else {
        archive.addUrlToList(url, function() {
          helpers.sendRedirect(res, '/loading.html');
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
    helpers.send404(res);
  }
};
