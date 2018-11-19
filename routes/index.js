const express = require('express');
const User = require('../models/user-model');
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
  // if (!req.user) {
  //   req.flash("error", "You have to be logged-in to visit the Profile page!");
  //   res.redirect("/login");
  // } else {
    res.render("profile-page.hbs");
  // }
});

router.get("/edit-profile", (req, res, next) => {
  res.render("edit-profile.hbs");
});

router.post("/process-edit", (req, res, next) => {
  const { firstName, lastName, email, organization, certNb, mainCert, secCert, speciality } = req.body

  // will need to check if a speciality was added before pushing it to the db, otherwise we will have it twice
  User.findById(req.user._id)
    .then(userDoc => {
      if (userDoc.speciality.includes(speciality)){
        speciality = null;
      }
    })
    .catch(err => next(err));

  User.findByIdAndUpdate(
    req.user._id, 
    { $set: { firstName, lastName, email, organization, certNb, mainCert, secCert }, $push: { speciality } }, 
    { runValidators: true },
    )
    .then(userDoc => {
      req.flash("success", "You have successfully updated your profile");
      req.redirect("/profile");
    })
    .catch(err => next (err));
});

// Courses PADI page
router.get('/padi', (req, res, next) =>{
  res.render('../views/course-route/padi.hbs');
});

// Courses SSL page
router.get('/ssl', (req, res, next) =>{
  res.render('../views/course-route/ssl.hbs');
});

// Courses SDI page
router.get('/sdi', (req, res, next) =>{
  res.render('../views/course-route/sdi.hbs');
});

module.exports = router;
