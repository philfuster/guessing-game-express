/* eslint-disable func-names */
const express = require('express');

const router = express.Router();

const debug = require('debug');

let log = debug('guess:index');

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', function (req, res, next) {
  log('Serving this shit up boi');
  res.render('index', { title: 'Guessing Game w/ Express' });
});

/* GET start page. */
// eslint-disable-next-line no-unused-vars
router.get('/start', function (req, res, next) {
  log('We startin baby..');
  res.render('start', { title: 'PAF Guessing Game' });
});

module.exports = router;
