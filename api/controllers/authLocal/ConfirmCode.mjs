import User from "../../model/UserSchema/User.Model.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"

export const confirmCode = catchAsync(async (req, res) => {
  const { code } = req.body

  if (!code) {
    return res.status(400).json({ message: "Code manquant", success: false })
  }

  // Étape 1: Recherchez l'utilisateur avec le code fourni
  const user = await User.findOne({ confirmationCode: code })
    .select("-password")
    .select("-confirmationCode")

  // Vérifiez si l'utilisateur existe et si son email est déjà confirmé
  if (!user) {
    return res
      .status(401)
      .json({ message: "Code invalide", success: false, user: null })
  }

  // Étape 2: Mettez à jour le statut d'email confirmé
  user.isEmailConfirmed = true
  await user.save()

  return res.status(200).json({
    message: "Code confirmé avec успé!",
    success: true,
    user: user,
  })
})
