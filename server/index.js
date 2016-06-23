// SERVER SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require('path');
var compress = require('compression')();
app.use(compress);

app.use(express.static(path.join(__dirname, '/../example')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../example/index.html');
});

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/../example' + req.path);
});

// START THE SERVER
app.listen(port);
console.log('The app is served on port ' + port);
