var passport = require('passport'),
    Runtrack = require('./model/schemas').Runtrack,
    mongoose = require('mongoose'),
    routes = require('./routes');

//Create database connection, connect to db and show errors in console
var db = mongoose.connection;
var connectionString = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/runtracker';

mongoose.connect(connectionString);
db.on('error', console.error.bind(console, 'connection error'));



var app = require('./server.js');
app = routes(app);
app.listen(process.env.PORT || 5000);
console.log("Started server running 'runtracker' at port 5000");
