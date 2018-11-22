const express = require("express");
const Divelog = require("../models/divelog-model");
const Divesite = require('../models/divesite-model');
const router = express.Router();

// limit adding room only to Log in Users
router.get('/dive/add-dive', (req, res, next) =>{
  if(!req.user){
    req.flash('error', 'You have to be logged-in to add a dive');
    res.redirect('/login');
}
else{
  res.render('divelog-route/add-divelog.hbs')
}
});

// adding divelog and assign it to user and divesite
router.post('/adddive', (req,res,next) =>{
  const {divesite, diveNb, date, depth, depthInfo, weightNb, weightInfo, suitThickness, airInfo, airInNb, airOut, diveTime, entryTime, exitTime, seen, comments, rating, divesiteReviews} = req.body;
  const user = req.user._id;
  Divesite.findOne({name: {$eq: divesite}})
  .then(oneDive =>{
    const divesite = oneDive._id;
    Divelog.create({diveNb, date, divesite, depth, depthInfo, weightNb, weightInfo, suitThickness, airInfo, airInNb, airOut, diveTime, entryTime, exitTime, seen, comments, rating, divesiteReviews, user})
    .then(diveDoc =>{
      req.flash("success", "Dive log created successfully");
      res.redirect('/divelog');
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
});

//Update DiveLogs
router.get('/dive/:diveId/editdive', (req, res, next) =>{
  const {diveId} = req.params;
  Divelog.findById(diveId)
  .populate("divesite")
  .then(oneDive =>{
    //res.send(oneDive);
    res.locals.oneEdit = oneDive;
    res.locals.dateValue = oneDive.date.toISOString().substr(0, 10);
    //console.log(oneDive.divesite.name);
    res.render('divelog-route/edit-divelog.hbs')
  })
  .catch(err => next(err));
});

router.post('/dive/:diveId/editprocess', (req,res, next) =>{
  const {diveId} = req.params;
  const {divesite, diveNb, date, depth, depthInfo, weightNb, weightInfo, suitThickness, airInfo, airInNb, airOut, diveTime, entryTime, exitTime, seen, comments, rating, divesiteReviews} = req.body;
  Divesite.findOne({name: {$eq: divesite}})
  .then(diveResult =>{
    const divesite = diveResult._id;
    Divelog.findByIdAndUpdate(
      diveId,
      {$set: {divesite, diveNb, date, depth, depthInfo, weightNb, weightInfo, suitThickness, airInfo, airInNb, airOut, diveTime, entryTime, exitTime, seen, comments, rating, divesiteReviews}},
      { runValidators: true }    )
      .then(diveDoc =>{
        res.locals.oneEdit = diveDoc;
        res.redirect('/divelog');
      })
      .catch(err=>next(err));
    })
    .catch(err=>next(err));
});

//Delete DiveLog
router.get('/dive/:diveId/delete', (req, res, next) =>{
  const {diveId} = req.params;
  Divelog.findByIdAndRemove(diveId)
  .then(diveresult =>{
    res.redirect('/divelog');
  })
  .catch(err => next(err))
})

module.exports = router;