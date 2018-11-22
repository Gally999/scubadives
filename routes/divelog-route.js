const express = require("express");
const Divelog = require("../models/divelog-model");
const Divesite = require("../models/divesite-model");
const router = express.Router();

// limit adding room only to Log in Users
router.get("/dive/add-dive", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You have to be logged-in to add a dive");
    res.redirect("/login");
  } else {
    Divelog.findOne({ user: { $eq: req.user._id } })
      .sort({ diveNb: -1 })
      .then(diveRef => {
        if (!diveRef){
          diveRef = 0;
        }
        let tempNum = Number(diveRef.diveNb) + 1;
        res.locals.diveNumber = tempNum;
        res.render("divelog-route/add-divelog.hbs");
      })
      .catch(err => next(err));
  }
});

// adding divelog and assign it to user and divesite
router.post("/adddive", (req, res, next) => {
  //Finding the Divelog Number from the form.
  const diveNb = req.body.diveNb
  Divelog.findOne({ diveNb: { $eq: diveNb } })
  //if they have the same number from the database they will "push +1" from the database
  //eg FORM divenumber 3 (current)----> (previous) database 3
  // (previous)database 3 will change to database 4
  //form divenumber 3 will continue to be 3.
    .then(dive => {
        if (dive) {
          return Divelog.updateMany(
            { diveNb: { $gte: diveNb } },
            { $inc: { diveNb: +1 } },
            { runValidators: true, new: true }
          );
        };
        return;
      })
  //.then will be from form
  // Taking the divesite database and connecting the name to divelog
  .then(()=> {
    const {divesite,} = req.body;
    return Divesite.findOne({ name: { $eq: divesite } })
  })
  //after the connection is being made. we are going to create(add) the dive
    .then(oneDivesite => {
      const {
        diveNb,
        date,
        depth,
        depthInfo,
        weightNb,
        weightInfo,
        suitThickness,
        airInfo,
        airInNb,
        airOut,
        diveTime,
        entryTime,
        exitTime,
        seen,
        comments,
        rating,
        divesiteReviews
      } = req.body;
      const user = req.user._id;
      const divesite = oneDivesite._id;
      return Divelog.create({
        diveNb,
        date,
        divesite,
        depth,
        depthInfo,
        weightNb,
        weightInfo,
        suitThickness,
        airInfo,
        airInNb,
        airOut,
        diveTime,
        entryTime,
        exitTime,
        seen,
        comments,
        rating,
        divesiteReviews,
        user
      })
    })
    .then((diveLogDoc)=>{
      return Divesite.findByIdAndUpdate(diveLogDoc.divesite,{ $push: { reviews: { user: diveLogDoc.user, comments: diveLogDoc.divesiteReviews } } }, { runValidators: true })
    })
      .then(divesiteCommentDoc => {
        req.flash("success", "Dive Log created successfully");
        res.redirect("/divelog");
      })
        .catch(err => next(err));
});

//Update DiveLogs
router.get("/dive/:diveId/editdive", (req, res, next) => {
  const { diveId } = req.params;
  Divelog.findById(diveId)
    .populate("divesite")
    .then(oneDive => {
      //res.send(oneDive);
      res.locals.oneEdit = oneDive;
      res.locals.dateValue = oneDive.date.toISOString().substr(0, 10);
      //console.log(oneDive.divesite.name);
      res.render("divelog-route/edit-divelog.hbs");
    })
    .catch(err => next(err));
});

router.post("/dive/:diveId/editprocess", (req, res, next) => {
  const { diveId } = req.params;
  const {
    divesite,
    diveNb,
    date,
    depth,
    depthInfo,
    weightNb,
    weightInfo,
    suitThickness,
    airInfo,
    airInNb,
    airOut,
    diveTime,
    entryTime,
    exitTime,
    seen,
    comments,
    rating,
    divesiteReviews
  } = req.body;
  Divesite.findOne({ name: { $eq: divesite } })
    .then(diveResult => {
      const divesite = diveResult._id;
      Divelog.findByIdAndUpdate(
        diveId,
        {
          $set: {
            divesite,
            diveNb,
            date,
            depth,
            depthInfo,
            weightNb,
            weightInfo,
            suitThickness,
            airInfo,
            airInNb,
            airOut,
            diveTime,
            entryTime,
            exitTime,
            seen,
            comments,
            rating,
            divesiteReviews
          }
        },
        { runValidators: true }
      )
        .then(diveDoc => {
          res.locals.oneEdit = diveDoc;
          res.redirect("/divelog");
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

//Delete DiveLog
router.get("/dive/:diveId/delete", (req, res, next) => {
  const { diveId } = req.params;
  Divelog.findByIdAndRemove(diveId)
    .then(diveresult => {
      return Divelog.updateMany(
        {
          $and: [
            { user: { $eq: req.user._id } },
            { diveNb: { $gt: diveresult.diveNb } }
          ]
        },
        { $inc: { diveNb: -1 } },
        { runValidators: true, new: true }
      );
    })
    .then(userdives => {
      res.redirect("/divelog");
    })
    .catch(err => next(err));
});

module.exports = router;
