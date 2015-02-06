
var url = require("url"),
        path = require("path"),
        fs = require("fs")

var router = function (handle, request, response) {
  var pathname = url.parse(request.url).pathname
          , filename = path.join(process.cwd() + '/public', pathname);
  console.log("About to route a request for " + pathname);

  if (typeof handle[pathname] === 'function') {
    return handle[pathname](request, response);
  } else {
    console.log("No request handler found for " + pathname);
    var contentTypesByExtension = {
      '.html': "text/html",
      '.css': "text/css",
      '.js': "text/javascript"
    };

    path.exists(filename, function (exists) {
      if (!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory())
        filename += '/index.html';

      fs.readFile(filename, "binary", function (err, file) {
        if (err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        var headers = {};
        var contentType = contentTypesByExtension[path.extname(filename)];
        if (contentType)
          headers["Content-Type"] = contentType;
        response.writeHead(200, headers);
        response.write(file, "binary");
        response.end();
      });
    });
  }
}

module.exports = router;

  