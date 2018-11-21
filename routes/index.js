const express = require('express');
const User = require('../models/user-model');
const Divelog = require('../models/divelog-model');
const Divesite = require('../models/divesite-model');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  //req.user comes from passport-setup.
  console.log(req);
  if(req.user){
    console.log("logged in", req.user);
  } else {
    console.log("not logged in", req.user);
  }
  //res.locals.currentUser = req.user;
  res.render('index');
});


// Access profile page 
router.get("/profile", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You have to be logged-in to visit the Profile page!");
    res.redirect("/login");
  } else {
    res.render("profile-page.hbs");
  }
});

// Access the edit profile page
router.get("/edit-profile", (req, res, next) => {
  res.render("edit-profile.hbs");
});

// Process the edition of the profile
router.post("/process-edit", (req, res, next) => {
  const { firstName, lastName, email, organization, certNb, mainCert, secCert, speciality } = req.body;
  
  let mySpeciality;
  User.findById(req.user._id)
    .then(userDoc => {
      // We check if a speciality was added during the editing ("nope" is the value in the select input of the form)
        // we check if the selected speciality was already in the array before pushing it to the db, otherwise we will have it twice
      let index = userDoc.speciality.indexOf(speciality);
      console.log("index =" + index);
      if ((speciality !== "nope") && (index === -1)) {
          userDoc.speciality.push(speciality);
      }
      mySpeciality = userDoc.speciality;

      // Then we search by Id and Update the db
      User.findByIdAndUpdate(
        req.user._id, 
        { $set: { firstName, lastName, email, organization, certNb, mainCert, secCert, speciality: mySpeciality } }, 
        { runValidators: true },
        )
        .then(userDoc => {
          req.flash("success", "You have successfully updated your profile");
          res.redirect("/profile");
        })
        .catch(err => next (err));
    // back to the original loop
    })
    .catch(err => next(err));
});

// If user wants to delete a speciality directly in the edit page
router.post("/speciality-delete/:speId", (req, res, next) => {
  const { speId } = req.params;
  let newSpeArray;
      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { speciality: speId } }, 
        { runValidators: true} 
        )
        .then(userDoc => {
          req.flash("success", "Speciality successfully removed");
          res.redirect("/edit-profile");
        })
        .catch(err => next(err));
});

// Courses PADI page
router.get('/padi', (req, res, next) =>{
  res.render('../views/course-route/padi.hbs');
});

// Courses SSL page
router.get('/ssi', (req, res, next) =>{
  res.render('../views/course-route/ssi.hbs');
});

// Courses SDI page
router.get('/sdi', (req, res, next) =>{
  res.render('../views/course-route/sdi.hbs');
});

//About Us page
router.get('/about-us', (req, res, next) =>{
  res.render('about-us.hbs');
});

//Dive Log page
router.get('/divelog', (req, res, next) =>{
  Divelog.find()
  .populate("divesite")
  .then(userDives =>{
    //res.send(userDives)
    res.locals.divelogs = userDives;
    if(!req.user){
        req.flash("error", "You have to be logged-in to visit the DIVE LOGS page!");
        res.redirect("/login");
      } else {
        res.render('../views/divelog-route/list-divelog.hbs');
    }
  })
  .catch(err=> next(err));
 
});

module.exports = router;
