import bcrypt from "bcrypt"

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

export const hashPassword = (password) => bcrypt.hashSync(password, salt)

export const comparePasswords = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword)
