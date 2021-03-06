const express = require("express");
const bcrypt = require("bcrypt");
const passport = require('passport');
const User = require("../models/user-model.js");
const router = express.Router();

// Sign Up & Add User
router.get('/signup', (req,res,next) =>{
    res.render('auth-route/signup-form.hbs')
});

router.post('/add-user', (req,res,next) =>{
    const { firstName, lastName, nationality, email, originalPassword, organization, certNb, mainCert, secCert, speciality,} = req.body;
    if (!originalPassword || !firstName || !lastName || !nationality || !email|| !organization || !certNb || !mainCert || originalPassword.match(/[0-9]/) === null)
    {
        req.flash("error", "Fields cannot be blank and Password must contain a number");
        res.redirect('/signup');
        return;
    }
    User.findOne({email: {$eq: email}})
    .then(userDoc =>{
        if (userDoc){
            req.flash("error", "This email is already in the database, please login if you already have an account");
            res.redirect('/login');
            return;
        }

        const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
        let toCreate = {firstName, lastName, nationality, email, encryptedPassword, organization, certNb, mainCert}
        if (speciality !== "nope"){
            toCreate = {firstName, lastName, nationality, email, encryptedPassword, organization, certNb, mainCert, secCert, speciality,}
        }
        User.create(toCreate)
        .then(userDoc =>{
            req.logIn(userDoc, () => {
                req.flash("success", "Congrats, your account was created successfully!");
                res.redirect("/");
            });
        })
        .catch(err =>next(err))
    })
    .catch(err =>next(err))

});

// Log In User
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
                req.logIn(userDoc, () => {
                    req.flash("success", "Congrats, you are now logged-in!");
                    res.redirect("/");
                });
            } else {
                req.flash("error", "Wrong password, please try again!");
                res.redirect("/login");
            }
        })
        .catch(err => next(err));
});

//Log out
router.get('/logout', (req,res,next) =>{
    req.logOut();
    req.flash("success", "You have logged-out successfully!")
    res.redirect('/');
});

// Visiting "/google/login" will redirect the user to Google for logging-in
router.get("/google/login", 
    passport.authenticate("google", {
        scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read",
        ]
    }
    ));

    // This is where users will be redirected to after accepting Google Login 
    router.get("/google/user-info", 
        passport.authenticate("google", {
            successRedirect: "/",
            successFlash: "Google login successful!", 
            failureRedirect: "/login", 
            failureFlash: "Google login failed!",
        }));

module.exports = router;