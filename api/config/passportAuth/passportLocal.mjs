import { Strategy as LocalStrategy } from "passport-local"
import User from "../../model/UserSchema/User.Model.mjs"
import { comparePasswords } from "../../utils/hashPassword.mjs"

const configureLocalStrategy = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email })
          if (!user) {
            return done(null, false, {
              message: "L'adresse email est incorrecte",
            })
          }

          const isMatch = await comparePasswords(password, user.password)
          if (!isMatch) {
            return done(null, false, {
              message: "Le mot de passe est incorrect",
            })
          }

          return done(null, user)
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

export default configureLocalStrategy
