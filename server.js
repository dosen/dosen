var harp = require("harp")
var dirPath = __dirname + "/public";
var port = process.env.PORT || 9000;
harp.server(dirPath, { port: port }, function () {
  console.log("listening at http://localhost:" + port);
});
