import { Router } from "express"
import { authLogout } from "../controllers/authLogout.mjs"
import { tcheckSession } from "../middleware/checkSession.mjs"

const routesAuthLogout = Router()
routesAuthLogout.get("/auth/logout", tcheckSession, authLogout)

export default routesAuthLogout
