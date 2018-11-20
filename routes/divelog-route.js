const express = require("express");
const Divelog = require("../models/divelog-model");
const router = express.Router();

// Adding Dive Log
router.get('/add-dive', (req, res, next) =>{
  res.render('divelog-route/add-divelog.hbs')
});

router.post('/added-dive', (req,res,next) =>{
  const {diveNb, }
});

module.exports = router;