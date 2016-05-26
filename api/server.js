var express = require('express')
var bodyParser = require('body-parser')
var port = 80;

var app = express();
app.use(express.static(__dirname + './../app/'));
app.use(bodyParser.json());

app.get('/api/backtrack/:size',function(req,res){

})

app.get('api/climb/:size',function(req,res){

})


app.listen(port,function(){
	console.log('Listening on http://localhost:%s',port);
	console.log('Stop Server With CTRL + C');
});
