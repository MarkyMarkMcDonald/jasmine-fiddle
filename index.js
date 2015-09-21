var path = require('path');
var express = require('express');
var app = express();

app.use("/js-cdd", express.static(path.join(__dirname, 'dist')));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
