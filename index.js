#!/usr/bin/env node
var express = require('express');
var harp = require('harp');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(harp.mount(__dirname + '/public'));

var env = process.env.NODE_ENV || 'development';
var default_port = (env == 'production') ? 80 : 9000;
app.set('port', process.env.PORT || default_port);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening at http://localhost:' + server.address().port);

  if (env == 'development') {
    var open = require('open');
    open('http://localhost:' + server.address().port);
  }
});

