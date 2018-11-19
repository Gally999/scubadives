const passport = require("passport");
const User = require("../../models/user-model.js");

// serializeUser: defines what data to save in the session
// happens when you log in successfully
passport.serializeUser((userDoc, done)=> {
    //result is the user ID we want to save in the session
    done(null, userDoc._id);
});

// deserializeUser: defines how to retrieve the user information from DB
// happens automatically on EVERY request AFTER you log in
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then(userDoc =>{
        // null is good, null means no error
        // result will be the user document from databse
        done(null, userDoc);
    })
    .catch(err => next(err));
});
