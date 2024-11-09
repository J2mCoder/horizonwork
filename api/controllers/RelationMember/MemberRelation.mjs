import jwt from "jsonwebtoken"
import User from "../../model/UserSchema/User.Model.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"

const MemberRelation = catchAsync(async (req, res) => {
  // Récupération de l'en-tête d'autorisation
  const authHeader = req.headers["authorization"]

  // Vérifie si le token est présent
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token manquant", user: null, success: false })
  }

  // Le token doit suivre le format 'Bearer <token>'
  const token = authHeader.split(" ")[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token invalide", success: false, user: null })
  }

  // Vérification du token
  jwt.verify(token, process.env.KEY_SECRET, async (err, decoded) => {
    if (err) {
      // Si le token est invalide, supprimer le cookie et renvoyer une erreur
      res.clearCookie("token")
      return res
        .status(401)
        .json({ message: "Token invalide", user: null, success: false })
    }

    // Recherche de l'utilisateur par ID décodé, sans le mot de passe
    const user = await User.findById(decoded.id, { password: 0 })

    if (!user) {
      return res
        .status(401)
        .json({ message: "Token invalide", user: null, success: false })
    }

    // Récupérer les utilisateurs actifs sans mot de passe, code de confirmation, données d'authentification Google
    const users = await User.find({
      isEmailConfirmed: true,
    }).select(
      "-password -confirmationCode -googleAuth -googleId -createdAt -updatedAt"
    )

    // Réponse avec la liste des utilisateurs
    res.status(200).json({
      success: true,
      users,
    })
  })
})

export default MemberRelation
