import passport from "passport"
import { catchAsync } from "../../utils/catchAsync.mjs"

export const loginLocal = catchAsync(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Non autorisé. Identifiants incorrects.",
      })
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }

      req.session.user = user._id // Stocker l'ID de l'utilisateur dans la session
      res.status(200).json({
        success: true,
        message: "Connexion réussie",
        user: {
          id: user._id,
          displayName: user.displayName,
          email: user.email,
        },
      })
    })
  })(req, res, next)
})
