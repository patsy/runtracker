
var express = require('express');
var app = express();

app.listen(process.env.PORT || 5432);

app.get('/fox', function(req, res){
  var q = "Hello my foxy pony!";
  res.json(q);
});

app.get('/', function(req, res){
  var q = "Hello my little pony!";
  res.json(q);
});
