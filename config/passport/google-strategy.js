const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../../models/user-model.js");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, 
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/user-info",
  proxy: true,
}, (accessToken, refreshToken, userInfo, done) => {
  console.log("Google user info ---------------------------------", userInfo);
  const { name, emails } = userInfo;

  User.findOne({ email: { $eq: emails[0].value } })
    .then(userDoc => {
      if (userDoc) {
        done(null, userDoc);
        return;
      }
      User.create({ firstName: name.givenName, lastName: name.familyName, email: emails[0].value })
        .then(userDoc => {
          done(null, userDoc);
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));