import "dotenv/config.js"
import jwt from "jsonwebtoken"
import User from "../../model/UserSchema/User.Model.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"

export const userVerificate = catchAsync(async (req, res) => {
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

    const tenMinutesInSeconds = 10 * 60
    const newExp = decoded.exp + tenMinutesInSeconds

    const tokenPayload = {
      id: user._id,
      email: user.email,
    }

    const newToken = jwt.sign(tokenPayload, process.env.KEY_SECRET, {
      expiresIn: newExp - Math.floor(Date.now() / 1000),
    })

    res.cookie("token", newToken, {
      httpOnly: false,
      secure: false,
      sameSite: "strict",
      expires: new Date(newExp * 1000),
    })

    res.status(200).json({
      success: true,
      message: "Authentification reussie",
      token: token,
      decoded: decoded,
      user: user,
    })
  })
})
