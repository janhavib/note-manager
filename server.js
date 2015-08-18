var express = require('express');
var path = require('path');
var app = express();
var route = require('./server/route');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(process.env.port||5000, function(){
	console.log("Magic happens on %d", process.env.port||5000);
});


route(app);

app.use(express.static('public'));



