import "dotenv/config.js"
import jwt from "jsonwebtoken"
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

  const existingUser = await User.findOne({
    $or: [{ email: Email }, { username: username }],
  })

  if (existingUser) {
    if (existingUser.email === Email) {
      return res
        .status(409)
        .json({ message: "Email déjà utilisé", success: false })
    }
    if (existingUser.username === username) {
      return res
        .status(409)
        .json({ message: "Nom d'utilisateur déjà utilisé", success: false })
    }
  }

  const newUser = await User.create({
    firstname: Fname,
    lastname: Lname,
    username: username,
    email: Email,
    password: Password,
    isEmailConfirmed: false,
    googleAuth: false,
    confirmationCode: otp(),
    googleId: null,
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
    expiresIn: 7 * 24 * 60 * 60 * 1000,
  })

  // Envoyer le cookie avec le token
  res.cookie("token", token, {
    httpOnly: false,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  sendMail(newUser.email, otp())

  res.status(201).json({
    success: true,
    message: "Utilisateur inscrit avec succès",
    user: userToReturn,
  })
})
