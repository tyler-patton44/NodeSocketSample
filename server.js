var express = require("express");
var path = require("path");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname);
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
const server = app.listen(1337, function() {
  console.log("listening on port 1337");
 });
const io = require('socket.io')(server);

var counter = 0;
io.on('connection', function (socket) {
  socket.emit('result', {amount: counter});

  socket.on('realTime', function(){
    socket.emit('result', {amount: counter});
  })

  socket.on('clicked', function(){
    counter += 1;
    socket.emit('result', {amount: counter});
  })

  socket.on('reset', function(){
    counter = 0;
    socket.emit('result', {amount: counter});
  })
});

app.get('/', function(req, res) {
  res.render("index");
})