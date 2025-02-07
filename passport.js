const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const dotenv = require("dotenv");
const User = require("./models/user.js");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://shopsphere-backend-app.vercel.app/api/auth/google/callback",
      passReqToCallback: true,
      session: false, 
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile); 

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || "", 
            avatar: profile.photos?.[0]?.value || "", 
          });

          await user.save();
          console.log("New User Created:", user);
        } else {
          console.log("Existing User Found:", user);
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in Google Authentication:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error("Error in deserialization:", err);
    done(err, null);
  }
});

module.exports = passport;