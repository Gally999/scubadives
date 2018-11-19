const express = require('express');
const User = require('../models/user-model');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  //req.user comes from passport-setup.
  if(req.user){
    console.log("logged in", req.user);
  }else {
    console.log("not logged in", req.user);
  }
  res.locals.currentUser = req.user;
  res.render('index');
});

module.exports = router;
