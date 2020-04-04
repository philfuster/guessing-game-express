/* eslint-disable func-names */
const express = require("express");

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/", function (req, res, next) {
  res.render("index", { title: "PAF Guessing Game w/ Express" });
});

module.exports = router;
