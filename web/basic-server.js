var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var cssHandler = require("./css-handler");
var url = require("url");
var helpers = require("./http-helpers");

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var urls = {
  '/': function(req, res) {
    handler.handleRequest(req, res);
  },
  '/styles.css': function(req, res) {
    cssHandler.cssRequest(req, res);
  },
  '/favicon.ico': function(req, res) {
    helpers.serveAssets(req, res);
  }
};
var server = http.createServer(function(req, res){
  var route = urls[url.parse(req.url).pathname];
  route(req, res);
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}
