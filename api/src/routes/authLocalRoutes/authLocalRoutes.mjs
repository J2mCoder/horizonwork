import { Router } from "express"
import { loginLocal } from "../../controllers/authLocal/Login.mjs"
import { signUpLocal } from "../../controllers/authLocal/SignUp.mjs"
import { Unauthorized } from "../../middleware/autorisationUser.mjs"

const routesAuthLocal = Router()

routesAuthLocal.post("/auth/signup", Unauthorized, signUpLocal)
routesAuthLocal.post("/auth/login", Unauthorized, loginLocal)
/* routesAuthLocal.get("/auth/verify-email/:id", confirmEmail) */

export default routesAuthLocal
