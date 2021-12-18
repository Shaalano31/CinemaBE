const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

router.get('/user', (req,res) => {

    const test = new Movie ({
        title: "Spiderman",
        room: 5
    });
    res.status(200);
    test.save() //
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({
          error: err,
          test: "Fail"
      })
    })
  });

module.exports = router;