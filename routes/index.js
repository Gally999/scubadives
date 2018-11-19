const express = require('express');
const User = require('../models/user-model');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  //req.user comes from passport-setup.
  console.log(req);
  if(req.user){
    console.log("logged in", req.user);
  }else {
    console.log("not logged in", req.user);
  }
  res.render('index');
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
