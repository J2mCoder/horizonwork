import "dotenv/config.js"
import jwt from "jsonwebtoken"
import { v4 as uuid } from "uuid"
import User from "../../model/UserSchema/User.Model.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"
import {
  filterConfirmPassword,
  filterEmail,
  filterFirstName,
  filterLastName,
  filterPassword,
} from "../../utils/filterDataUser.mjs"
import { hashPassword } from "../../utils/hashPassword.mjs"
import { otp } from "../../utils/otp.mjs"
import { sendMail } from "../../utils/sendMailAuth.mjs"

export const signUpLocal = catchAsync(async (req, res) => {
  const { firstname, lastname, email, username, password, confirmPassword } =
    req.body

  const Fname = filterFirstName(firstname, res)
  const Lname = filterLastName(lastname, res)
  const Email = await filterEmail(email, res)
  const Password = await hashPassword(filterPassword(password, res))
  const confirmationError = filterConfirmPassword(
    confirmPassword,
    password,
    res
  )
  if (confirmationError) return confirmationError

  const googleId = uuid() // Génère un ID Google si nécessaire

  const existingUser = await User.findOne({
    $or: [{ email: Email }, { username: username }],
  })

  if (existingUser) {
    if (existingUser.email === Email) {
      return res.status(409).json({ error: "Email déjà utilisé" })
    }
    if (existingUser.username === username) {
      return res.status(409).json({ error: "Nom d'utilisateur déjà utilisé" })
    }
  }

  const newUser = await User.create({
    firstname: Fname,
    lastname: Lname,
    username: username,
    email: Email,
    password: Password,
    googleId: googleId,
    isEmailConfirmed: false,
    token: uuid(),
    googleAuth: false,
  })

  const userToReturn = {
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    username: newUser.username,
    email: newUser.email,
    isEmailConfirmed: newUser.isEmailConfirmed,
    googleAuth: newUser.googleAuth,
  }
  const tokenPayload = { id: newUser._id, email: newUser.email } // Créez un payload pour le token
  const token = jwt.sign(tokenPayload, process.env.KEY_SECRET, {
    expiresIn: 72 * 60 * 60 * 1000,
  })

  // Envoyer le cookie avec le token
  res.cookie("token", token, {
    httpOnly: false,
    secure: false,
    maxAge: 72 * 60 * 60 * 1000,
  })

  sendMail(newUser.email, otp())

  res.status(201).json({
    success: true,
    message: "Utilisateur inscrit avec succès",
    user: userToReturn,
  })
})
