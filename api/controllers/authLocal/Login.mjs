import jwt from "jsonwebtoken"
import passport from "passport"
import { catchAsync } from "../../utils/catchAsync.mjs"

export const loginLocal = catchAsync(async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Non autorisé. Identifiants incorrects.",
      })
    }

    const tokenPayload = { id: user._id, email: user.email }
    const token = jwt.sign(tokenPayload, process.env.KEY_SECRET, {
      expiresIn: 7 * 24 * 60 * 60,
    })

    // Envoyer le cookie avec le token
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      user,
      token, // Optionally include token in the JSON response
    })
  })(req, res, next)
})
