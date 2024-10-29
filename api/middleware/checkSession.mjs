import "dotenv/config"
import jwt from "jsonwebtoken"
import User from "../model/UserSchema/User.Model.mjs"

export const checkSession = async (req, res, next) => {
  const token = req.cookies.token // Remplacez 'token' par le nom de votre cookie

  if (!token) {
    // Si aucun token, vous pouvez répondre avec une erreur
    return res.status(401).json({ message: "Accès non autorisé" })
  }

  try {
    // Vérifiez le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // Assurez-vous que JWT_SECRET est défini dans votre .env

    // Vérifiez si l'utilisateur existe dans la base de données
    const user = await User.findById(decoded.id) // Assurez-vous que votre modèle User a une méthode findById
    if (!user) {
      // Supprimer le cookie si l'utilisateur n'existe pas
      res.clearCookie("token") // Remplacez 'token' par le nom de votre cookie
      return res.status(401).json({ message: "Utilisateur non trouvé" })
    }

    // Si tout est bon, attacher l'utilisateur à la requête
    req.user = user
    next()
  } catch (error) {
    console.error(error)

    // Supprimer le cookie en cas d'erreur
    res.clearCookie("token") // Remplacez 'token' par le nom de votre cookie
    return res.status(401).json({ message: "Token invalide" })
  }
}
