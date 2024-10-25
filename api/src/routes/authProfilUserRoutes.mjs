import { Router } from "express"
import { sessionAuthUser } from "../controllers/initialProfilUser.mjs"
import { tcheckSession } from "../middleware/checkSession.mjs"

const routerAuthProfilUser = Router()

routerAuthProfilUser.get("/auth/check-profil", tcheckSession, sessionAuthUser)

export default routerAuthProfilUser
