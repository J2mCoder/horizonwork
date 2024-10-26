import { Router } from "express"
import { loginLocal } from "../../controllers/authLocal/Login.mjs"
import { signUpLocal } from "../../controllers/authLocal/SignUp.mjs"

const routesAuthLocal = Router()

routesAuthLocal.post("/auth/sign-up", signUpLocal)
routesAuthLocal.post("/auth/login", loginLocal)
/* routesAuthLocal.get("/auth/verify-email/:id", confirmEmail) */

export default routesAuthLocal
