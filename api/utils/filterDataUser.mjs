import validator from "validator"
import User from "../model/UserSchema/User.Model.mjs"

const regex = /^[A-Za-z0-9_-]+$/
const regexName = /^[A-Za-zÀ-ÿ\s]+$/

export const filterFirstName = (name, res) => {
  if (!validator.isLength(name, { min: 2, max: 20 })) {
    return res.status(400).json({
      message: "Le prénom doit avoir entre 2 et 20 caractères.",
      success: false,
    })
  } else if (!regexName.test(name)) {
    return res.status(400).json({
      message:
        "Le prénom doit contenir uniquement des caractères alphabétiques.",
      success: false,
    })
  } else if (validator.isEmpty(name, { ignore_whitespace: false }) || !name) {
    return res
      .status(400)
      .json({ message: "Le prénom ne doit pas être vide.", success: false })
  } else {
    return validator.escape(name.trim())
  }
}

export const filterLastName = (name, res) => {
  if (!validator.isLength(name, { min: 2, max: 20 })) {
    return res.status(400).json({
      message: "Le nom doit avoir entre 2 et 20 caractères.",
      success: false,
    })
  } else if (!regexName.test(name)) {
    return res.status(400).json({
      message: "Le nom doit contenir uniquement des caractères alphabétiques.",
      success: false,
    })
  } else if (validator.isEmpty(name, { ignore_whitespace: false }) || !name) {
    return res
      .status(400)
      .json({ message: "Le nom ne doit pas être vide.", success: false })
  } else {
    return validator.escape(name.trim())
  }
}

export const filterEmail = async (email, res) => {
  const findMail = await User.findOne({ email: email })
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "L'email n'est pas valide.", success: false })
  } else if (validator.isEmpty(email, { ignore_whitespace: false }) || !email) {
    return res
      .status(400)
      .json({ message: "L'email ne doit pas être vide.", success: false })
  } else if (!validator.isLength(email, { min: 5, max: 50 })) {
    return res.status(400).json({
      message: "L'email doit avoir entre 5 et 50 caractères.",
      success: false,
    })
  } else {
    return validator.escape(email.toLowerCase().trim())
  }
}

export const filterPassword = (password, res) => {
  if (!validator.isLength(password, { min: 8, max: 20 })) {
    return res.status(400).json({
      message: "Le mot de passe doit avoir entre 8 et 20 caractères.",
      success: false,
    })
  } else if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spéciaux.",
      success: false,
    })
  } else if (
    validator.isEmpty(password, { ignore_whitespace: false }) ||
    !password
  ) {
    return res.status(400).json({
      message: "Le mot de passe ne doit pas être vide.",
      success: false,
    })
  } else {
    return validator.escape(password)
  }
}

export const filterConfirmPassword = (password, confirmPassword, res) => {
  if (password !== confirmPassword && confirmPassword !== "") {
    return res.status(400).json({
      message: "Les mots de passe ne sont pas identiques.",
      success: false,
    })
  }
}
