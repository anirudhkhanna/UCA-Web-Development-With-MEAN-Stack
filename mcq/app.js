var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

app.get('/test', function(req, res){
  console.log("In method test");
  res.end("<h1 style='background:#ef5434; color: white;'>hurray!! <span style='color:#ef5434; background: white;'>mcq web service</span> is working</h1>")
});

var server = app.listen(8080)


 
