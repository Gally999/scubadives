const express = require("express");
const Divelog = require("../models/divelog-model");
const Divesite = require('../models/divesite-model');
const router = express.Router();

// limit adding room only to Log in Users
router.get('/dive/add-dive', (req, res, next) =>{
  if(!req.user){
    req.flash('error', 'You have to be Logged In to add dive');
    res.redirect('/login');
}
else{
  res.render('divelog-route/add-divelog.hbs')
}
});

//adding divelog and assign it to user and divesite
router.post('/adddive', (req,res,next) =>{
  const {divesite} = req.body;
  Divesite.findOne({name: {$eq: divesite}})
  .then()
  .catch()
  .then(response=>{
    console.log(response)
  })
  // const {diveNb, date, divesite, depth, depthInfo, weightNb, weightInfo, suitThickness, airInfo, airInNb, airOut, diveTime, entryTime, exitTime, seen, comments, rating, divesiteReviews} = req.body;
  // const user = req.user._id;

  // Divelog.create({diveNb, date, divesite, depth, depthInfo, weightNb, weightInfo, suitThickness, airInfo, airInNb, airOut, diveTime, entryTime, exitTime, seen, comments, rating, divesiteReviews, user})
  // .then(diveDoc =>{
  //   req.flash("success", "Dive Log Created successfully");
  //       res.redirect("/divelog");
  // })
  // .catch(err => next(err));
  // res.sed = req.body;
});


module.exports = router;