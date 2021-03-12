var express = require('express');
var app = express();
var bodyParser = require('body-parser');

console.log('Hello World');

app.use(bodyParser.urlencoded({ extended: false}))
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

app.get("/:word/echo",function(req, res) {
  
  res.json({ echo : req.params.word});

});

app.route("/name")
  .get(function(req, res) {

    console.log(req.query);
    res.json({ name : req.query.first + ' ' + req.query.last });

  })
  .post(function(req, res) {
    console.log(req.body);
    res.json({ name : req.body.first + ' ' + req.body.last });

  });


































 module.exports = app;
