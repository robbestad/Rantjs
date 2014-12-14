// SERVER SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require('path');
var compress = require('compression')();
app.use(compress);

// ROUTES
// ==============================================
app.use(express.static(path.join(__dirname, './dist')));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/*', function (req, res) {
    console.log(process.env.NODE_ENV);
    console.log(req.path);
    res.sendFile(__dirname + '/' + req.path);
});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('The app is served on port ' + port + ", mode: " + process.env.NODE_ENV);
