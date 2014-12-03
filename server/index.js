// SERVER SETUP
// ==============================================

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require('path');
var compress = require('compression')();
    app.use(compress);

app.use(express.static(path.join(__dirname, '/../dist')));

// sample route with a route the way we're used to seeing it
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../dist/index.html');
});

app.get('/*', function (req, res) {
	console.log(req.path);
/*    res.header("Cache-Control", "public, max-age=2419200"); // 2419200 14 days
    res.header("Expires", new Date(Date.now() + 345600000).toUTCString()); // 345600000*/
    res.sendFile(__dirname + '/../dist' + req.path);
});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('The app is served on port ' + port + ", mode: " + process.env.NODE_ENV);
