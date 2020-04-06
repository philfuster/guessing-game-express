/* eslint-disable func-names */
const express = require('express');

const router = express.Router();

const debug = require('debug');

const log = debug('guess:index');

/*
  Function Defitions
*/
/**
 * Handle Start Request
 * @param {Request Object} req - Request Object
 * @param {Response Object} res - Response Object
 * @param {Next} next - Used to pass control to the next route handler.
 */
function handleStart(req, res, next) {
  log('Start Requested..');
  const secretNumber = Math.floor(Math.random() * 10 + 1);
  req.session.secretNumber = secretNumber;
  req.session.log(`Number Generated: ${secretNumber}`);
  res.render('start', { title: 'Guessing Game' });
}

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', function (req, res, next) {
  log('Serving this shit up boi');
  res.render('index', { title: 'Guessing Game w/ Express' });
});

/* GET start page. */
// eslint-disable-next-line no-unused-vars
router.get('/start', handleStart);

module.exports = router;
