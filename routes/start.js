/* eslint-disable func-names */
const express = require("express");

const router = express.Router();

const debug = require("debug")("start");

/* GET start page. */
// eslint-disable-next-line no-unused-vars
router.get("/start", function (req, res, next) {
  debug("We startin baby..");
  res.render("start", { title: "PAF Guessing Game Start" });
});

module.exports = router;
