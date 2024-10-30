import jwt from "jsonwebtoken"
import User from "../model/UserSchema/User.Model.mjs"

export function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"]

  // Vérifie si le token est présent
  if (!authHeader) {
    return res.status(401).json({
      message: "utilisateur non autoriser",
      user: null,
      success: false,
    })
  }

  // Le token doit suivre le format 'Bearer <token>'
  const token = authHeader.split(" ")[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token invalide", success: false, user: null })
  }

  // Vérifie si le token est valide et a expiré
  jwt.verify(token, process.env.KEY_SECRET, async (err, decoded) => {
    if (err) {
      res.clearCookie("token")
      return res
        .status(401)
        .json({ message: "Token invalide", user: null, success: false })
    }

    const user = await User.findById(decoded.id, { password: 0 })

    if (!user) {
      return res
        .status(401)
        .json({ message: "Token invalide", user: null, success: false })
    }

    next()
  })
}
