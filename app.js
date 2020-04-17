/*
  === Requires ===
*/
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
// Mongo Client
const { MongoClient } = require('mongodb');
const assert = require('assert');
/*
  === Local Variables ===
*/
// Express Session Option Object
const sess = {
  secret: 'Phil is cool...duh',
  resave: false,
  saveUninitialized: false,
  cookie: {},
};
// Binding debug's output to the console.
// Initializing Loggers
debug.log = console.log.bind(console);
const log = debug('guess:app');
const error = debug('guess: error');
// Router declaration
const indexRouter = require('./routes/index.js');
// Database Connection Variables
// Connection URL
const dbUrl =
  'mongodb+srv://paf:test@guessinggame-2plqp.mongodb.net/test?retryWrites=true&w=majority';
// Database name
const dbName = 'GuessingGame';
// Create new MongoClient
const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

let db;
let gamesCol;
/*
  === Function Definitions ===
*/
function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}
const app = express();
/*
  === Main Logic ===
*/
(async function () {
  try {
    await client.connect();
    log('Connected to MongoDB Atlas correctly');
    db = client.db(dbName);
    gamesCol = db.collection('games');
    log('PAF Guessing Game Application started...');
    // view engine setup
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/routes')));
    app.use(session(sess));

    // Set Routers
    app.use('/', indexRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(errorHandler);
  } catch (err) {
    error(err.stack);
  }
})();
module.exports = app;
