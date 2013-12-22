var express = require('express');
var path = require('path');
var port = process.env.ZUUL_PORT;
var root = path.join(__dirname, '..', '..');

var app = express();
app.use('/', express.static(root));
app.listen(port);