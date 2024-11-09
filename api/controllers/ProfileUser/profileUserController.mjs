import jwt from "jsonwebtoken"
import Flags from "../../model/UserSchema/Flag.mjs"
import User from "../../model/UserSchema/User.Model.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"

const ProfileUserController = catchAsync(async (req, res) => {
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

  jwt.verify(token, process.env.KEY_SECRET, async function (err, decoded) {
    if (err) {
      res.clearCookie("token")
      return res
        .status(401)
        .json({ message: "Token invalide", user: null, success: false })
    }

    const user = await User.findById(decoded.id).select({
      password: 0,
      confirmationCode: 0,
      googleAuth: 0,
      googleId: 0,
    })

    const flags = await Flags.find().select({
      __v: 0,
    })

    return res.status(200).json({
      success: true,
      message: "profile utilisateur",
      user: user,
      flagsAll: flags,
    })
  })
})

export default ProfileUserController
