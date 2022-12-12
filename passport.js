const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "722506107018-q097pg5qn0hfaffbks5gt87mfnbif8q8.apps.googleusercontent.com", // Your Credentials here.
      clientSecret: "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", // Your Credentials here.
      callbackURL: "http://localhost:3000",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
