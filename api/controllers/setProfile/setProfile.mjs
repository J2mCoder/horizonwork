import "dotenv/config.js"
import jwt from "jsonwebtoken"
import User from "../../model/UserSchema/User.Model.mjs"

export const setProfile = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Aucun fichier envoyé" })
  }

  const authHeader = req.headers["authorization"]

  // Vérifie si le token est présent
  if (!authHeader) {
    return res.status(401).json({
      message: "utilisateur non autoriser",
      user: null,
      success: false,
    })
  }

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

    const user = await User.findByIdAndUpdate(decoded.id, {
      $set: {
        avatar: req.file?.filename,
      },
      new: true,
    })
      .select("-password")
      .select("-confirmationCode")

    if (!user) {
      return res
        .status(401)
        .json({ message: "Token invalide", user: null, success: false })
    }

    return res.status(200).json({
      success: true,
      message: "Profile mis à jour avec succès",
      user: user,
    })
  })
}
