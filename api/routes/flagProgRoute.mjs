import { Router } from "express"
import { flagsProg } from "../controllers/flagProgramming.mjs"

const flagsProgRoute = Router()

flagsProgRoute.post("/flags", flagsProg)

export default flagsProgRoute
