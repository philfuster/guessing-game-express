const express = require('express');

const router = express.Router();

const debug = require('debug');

const log = debug('guess:index');

const dateformat = require('dateformat');

const { ObjectID } = require('mongodb');

/*
  === Function Defitions ===
*/

/**
 * Initialize Guessing Game.
 * @param {Request} req - Request object
 */
function init(req) {
  const secretNumber = Math.floor(Math.random() * 10 + 1);
  const now = dateformat();
  const id = ObjectID();
  //
  req.session.secretNumber = secretNumber;
  req.session.newGame = true;
  req.session.timeStamp = now;
  req.session.id = id;
  log(`Number Generated: ${secretNumber}`);
}

/**
 * Handle Start GET Request
 * @param {Request Object} req - Request Object
 * @param {Response Object} res - Response Object
 */
function handleStart(req, res) {
  log('Start being Handled...');
  init(req);
  res.render('start', { title: 'Guessing Game' });
}
/**
 * Handle Guess POST Request
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
function handleGuess(req, res) {
  log('Guess being Handled...');
  const { guess } = req.body;
  const { secretNumber } = req.session;
  const success = parseInt(guess, 10) === secretNumber;
  const high = guess > secretNumber;
  const low = guess < secretNumber;
  const model = {};
  //
  log(`Guess submitted: ${guess}`);
  log(`${secretNumber} <> ${guess}`);
  model.title = 'Guessing Game';
  if (success) {
    res.end(JSON.stringify({ result: 'success' }));
    return;
  }
  if (high) {
    model.result = 'too high';
    model.class = 'highGuess';
  } else if (low) {
    model.result = 'too low';
    model.class = 'lowGuess';
  }
  model.guess = guess;
  // New Game. Create DB record.
  if (req.session.newGame) {
    req.session.newGame = false;
    res.render('guessForm', model);
  } else {
    res.end(JSON.stringify({ result: model.result }));
  }
}

/**
 * Handle Success
 */
function handleSuccess(req, res) {
  res.render('success', { title: 'Guess Game w/ Express' });
}

/*
  === Routes ===
*/
/* GET index */
router.get('/', function (req, res) {
  log('Serving index');
  res.render('index', { title: 'Guessing Game w/ Express' });
});

/* GET start */
router.get('/start', handleStart);

/* POST guess */
router.post('/guess', handleGuess);

/* GET success */
router.get('/success', handleSuccess);

module.exports = router;
