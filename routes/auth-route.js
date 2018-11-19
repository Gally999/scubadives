const express = require("express");
const bcrypt = require("bcrypt");
const passport = require('passport');
const User = require("../models/user-model.js");
const router = express.Router();

// Sign Up & Add User
router.get('/signup', (req,res,next) =>{
    res.render('auth-views/signup-form')
});

router.post('/adduser', (req,res,next) =>{
    const { firstName, lastName, nationality, email, originalPassword, organization, certNb, mainCert, secCert, speciality, isShopOwner} = req.body;
    if (!originalPassword || !firstName || !lastName|| !nationality || !email|| !organization || !certNb || !mainCert || !isShopOwner|| originalPassword.match(/[0-9]/) === null){
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
        User.create({firstName, lastName, nationality, email, encryptedPassword, organization, certNb, mainCert, secCert, speciality, isShopOwner})
        .then(userDoc =>{
            req.flash("success", "Created Successfully");
            res.redirect('/');
        })
        .catch(err =>next(err))
    })
    .catch(err =>next(err))
});

module.exports = router;