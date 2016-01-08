var express = require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var app = express();
var cloudinary = require('cloudinary');
var mongo = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/',function(req,res) {
	res.send('hello world');
});

cloudinary.config({ 
  cloud_name: 'gouravapp', 
  api_key: '849822728316812', 
  api_secret: 'wcpLuPoX-1QYg8d90dO3o2dPzZU' 
});


mongo.connect('mongodb://simpledb:toughpassword@ds037395.mongolab.com:37395/gouravapp', function(err,db) {
	if(err) throw err;
	console.log('connected to gouravapp database');

	var products_collection = db.collection('productsinfo');

	/*below are the api's made*/
	app.get('/api/getproducts', function(req,res) {   // for getting all the products details and images as well
		console.log('getproducts api called');
		products_collection.find().toArray(function(err,products) {
			res.json(products);
		});
	});

	app.post('/api/postproduct', function(req,res) {  // for posting the specific product details and pushing it into the database
		console.log('postproduct api called');
		cloudinary.uploader.upload(req.body.imagepath, function(result) { 
		  if(result) {
		  	console.log(result);
		  	products_collection.insert({productname: req.body.productname , imagelink: result.url , imageid: req.body.imageid});
		  }
		},
		 { 
			public_id: req.body.imageid 
		 }
		);
	});

});

var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log('listening on port ' + port);
