import express from "express"
import { userVerificate } from "../../controllers/authVerification/userVerificate.mjs"

const authUserVerificate = express.Router()

authUserVerificate.get("/verify-user", userVerificate)

export default authUserVerificate
