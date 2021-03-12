var express = require('express');
var app = express();

console.log('Hello World');

app.use("/public", express.static(__dirname + "/public"));

app.get("/",function(req, res) {
  // res.send('Hello Express');
  res.sendFile('/views/index.html', { root : __dirname});
});

app.get("/json",function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
  if(process.env.MESSAGE_STYLE === "uppercase"){
       res.json({"message" : "HELLO JSON"});
  }
  
  res.json({"message" : "Hello json"});

});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send({time : req.time});
});


































 module.exports = app;
