import User from "../model/UserSchema/User.Model.mjs"

export const Unauthorized = async (req, res, next) => {
  try {
    if (req.user || req.session.user) {
      console.log(req.user, req.session.user)

      const user = await User.findById(req.user || req.session.user)

      if (user) {
        return next()
      } else {
        req.session.destroy((err) => {
          if (err) {
            console.error("Erreur lors de la destruction de la session", err)
            return res.status(500).json({
              message: "Erreur serveur lors de la destruction de la session.",
              type: "error",
            })
          }

          res.clearCookie("connect.sid", {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })

          return res.status(401).json({
            message: "Session expirée ou utilisateur introuvable.",
            type: "error",
          })
        })
      }
    } else {
      return next()
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error)
    return res.status(500).json({
      message: "Erreur serveur lors de la vérification de l'utilisateur.",
      type: "error",
    })
  }
}
