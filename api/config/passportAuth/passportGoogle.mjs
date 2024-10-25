import "dotenv/config"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { v4 as uuidv4 } from "uuid"
import User from "../../model/UserSchema/User.Model.mjs"

const configureGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const googleId = profile.id || null
          const displayName = profile?.displayName || null
          const profilePicture = profile.photos[0]?.value || null
          const fname = profile.name?.givenName || null
          const lname = profile.name?.familyName || null
          const email = profile.emails[0]?.value || null
          const shortName =
            fname && lname ? `${fname.charAt(0)}${lname.charAt(0)}` : null
          const username =
            fname && lname
              ? `${fname.replace(/\s+/g, "").toLowerCase()}${lname
                  .replace(/\s+/g, "")
                  .toLowerCase()}${Math.floor(Math.random() * 1000)}`
              : null

          const user = await User.findOne({ googleId: googleId })
          console.log("Utilisateur trouvé :", profile)
          if (googleId === null) {
            return cb(null, false)
          }
          if (!user) {
            const newUser = await User.create({
              fname: fname,
              lname: lname,
              username: username,
              displayName: displayName,
              shortName: shortName,
              email: email,
              profilePicture: profilePicture,
              password: null,
              googleId: googleId,
              emailConfirmationToken: uuidv4(),
              isEmailConfirmed: true,
              token: uuidv4(),
              status: "active",
            })

            return cb(null, newUser)
          }
          return cb(null, user)
        } catch (error) {
          return cb(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}

export default configureGoogleStrategy
