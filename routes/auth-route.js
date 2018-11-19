const express = require("express");
const bcrypt = require("bcrypt");
const passport = require('passport');
const User = require("../models/user-model.js");
const router = express.Router();

// Sign Up & Add User
router.get('/signup', (req,res,next) =>{
    res.render('auth-views/signup-form')
});

module.exports = router;