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
            req.flash("error", "Email is already in the Database");
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
            req.flash("success", "Created Successfully");
            res.redirect('/login');
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
                    req.flash("success", "Congrats, you are logged-in!");
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
    req.flash("success", "Log Out successfully!!")
    res.redirect('/');
});




module.exports = router;