var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;

app.get('/',function(req,res) {
	res.send('hello world');
});


mongo.connect('mongodb://simpledb:toughpassword@ds037395.mongolab.com:37395/gouravapp', function(err,db) {
	if(err) throw err;
	console.log('connected to gouravapp database');

	/*below are the api's made*/
	app.get('/api/getproducts', function(req,res) {
		res.send('getproducts api called');
	});

});

var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log('listening on port ' + port);
