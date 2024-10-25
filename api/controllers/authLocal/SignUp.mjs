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
import { sendMail } from "../../utils/sendMailAuth.mjs"

export const signUpLocal = catchAsync(async (req, res) => {
  const { fname, lname, email, username, password, confirmPassword } = req.body

  const Fname = filterFirstName(fname, res)
  const Lname = filterLastName(lname, res)
  const Email = await filterEmail(email, res)
  const Password = await hashPassword(filterPassword(password, res)) // Attendre le hashage
  const confirmationError = filterConfirmPassword(
    confirmPassword,
    password,
    res
  )
  if (confirmationError) return confirmationError

  const googleId = uuid()

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
    fname: Fname,
    lname: Lname,
    username: username,
    email: Email,
    password: Password,
    googleId: googleId,
    isEmailConfirmed: false,
    token: uuidv4(),
    googleAuth: false,
  })

  const userToReturn = {
    displayName: newUser.displayName,
    shortName: newUser.shortName,
    otp: newUser.otp,
  }

  sendMail(newUser.token, newUser.email)
  req.session.user = newUser._id
  res.status(201).json({ success: userToReturn })
})
