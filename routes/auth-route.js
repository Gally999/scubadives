const express = require("express");
const bcrypt = require("bcrypt");
const passport = require('passport');
const User = require("../models/user-model.js");
const router = express.Router();

// Sign Up & Add User
router.get('/signup', (req,res,next) =>{
    res.render('auth-views/signup-form')
});

router.get("/login", (req, res, next) => {
    res.render("auth-route/login-form.hbs");
});

router.post("/login-process", (req, res, next) => {
    const { email, originalPassword } = req.body;

    User.findOne({ email: { $eq: email } })
        .then(userDoc => {
            if (!userDoc) {
                req.flash("error", "Please create an account first");
                res.redirect("/signup");
            }
            const { encryptedPassword } = userDoc;
            if(bcrypt.compareSync(originalPassword, encryptedPassword)) {
                res.redirect("/");
            } else {
                req.flash("error", "Wrong password, please try again!");
                res.redirect("/login");
            }
        })
        .catch(err => next(err));
});

module.exports = router;