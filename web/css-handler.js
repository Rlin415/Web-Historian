var fs = require("fs");
var headers = require("./http-helpers");
headers.headers['Content-Type'] = "text/css";
var actions = {
  "GET": function(req, res) {
    res.writeHead(200, headers.headers);
    fs.readFile("./public/styles.css", function(err, content) {
      res.write(content);
      res.end();
    });
  },
  "POST": function(req, res) {
    res.writeHead(headers.headers);
    res.end(200);
  },
  "OPTIONS": function(req, res) {
    res.writeHead(headers.headers);
    res.end(200);
  }
};

exports.cssRequest = function (req, res) {
  var action = actions[req.method];
  action(req, res);
};
