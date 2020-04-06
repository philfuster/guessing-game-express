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
  const success = guess === secretNumber;
  const high = guess > secretNumber;
  const low = guess < secretNumber;
  log(`Guess submitted: ${guess}`);
  log(`${secretNumber} <> ${guess}`);

  if (success) {
    res.end(JSON.stringify({ result: 'success' }));
  } else if (high) {
    res.end(JSON.stringify({ result: 'high' }));
  } else if (low) {
    res.end(JSON.stringify({ result: 'low' }));
  }
}

/* GET home page. */
router.get('/', function (req, res) {
  log('Serving this shit up boi');
  res.render('index', { title: 'Guessing Game w/ Express' });
});

/* GET start page. */
// eslint-disable-next-line no-unused-vars
router.get('/start', handleStart);

router.post('/guess', handleGuess);

module.exports = router;
