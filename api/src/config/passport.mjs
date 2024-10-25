import passport from "passport"
import configureGoogleStrategy from "./passportAuth/passportGoogle.mjs"
import configureLocalStrategy from "./passportAuth/passportLocal.mjs"

const configurePassport = () => {
  // Configurer la stratégie Google
  configureGoogleStrategy(passport)

  // Configurer la stratégie locale
  configureLocalStrategy(passport)

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

export default configurePassport
