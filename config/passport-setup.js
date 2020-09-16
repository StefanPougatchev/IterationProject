const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
passport.use(
  new GoogleStrategy(
    {
      // option for google Strategy
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.secret,
    },
    (accessToken, refershToken, profile, done) => {
      // passport callback function
      console.log(profile);
    }
  )
);
