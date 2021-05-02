require("dotenv").config();
const passport = require("passport");
const LocalStrategy1 = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (app) => {

  passport.use(
    new LocalStrategy1((username, password, done) => {
      if (username === "admin" && password === "admin") {
        done(null, { username, is_admin: true });
      } else {
        done(null, false, { message: "Invalid username/password" });
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/oauth2callback",
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null, { username: profile.emails[0].value });
      }
    )
  );
};

