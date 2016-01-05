var express = require('express');
var app = express();

app.get('*',function(req,res) {
	res.send('hello world');
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log('listening on port ' + port);