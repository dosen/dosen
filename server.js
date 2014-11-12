var harp = require("harp")
var dirPath = __dirname;
var port = process.env.PORT || 9000;
harp.server(dirPath, { port: port }, function () {
  console.log("listening at http://localhost:" + port);
});
