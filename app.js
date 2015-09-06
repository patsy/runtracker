var passport = require('passport'),
    Runtrack = require('./model/schemas').Runtrack,
    mongoose = require('mongoose'),
    routes = require('./routes'),
    logger = require('./logger');

//Create database connection, connect to db and show errors in console
var db = mongoose.connection;
var connectionString = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/runtracker';

mongoose.connect(connectionString);
db.on('error', console.error.bind(console, 'connection error'));



var app = require('./server.js'),
    port = process.env.PORT || 5000;
app = routes(app);
app.listen(port);
logger.log('debug', 'Started server running runtracker at port ' + port);
