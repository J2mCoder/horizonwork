import { Router } from "express"
import { confirmCode } from "../../controllers/authLocal/ConfirmCode.mjs"
import { loginLocal } from "../../controllers/authLocal/Login.mjs"
import logout from "../../controllers/authLocal/Logout.mjs"
import { signUpLocal } from "../../controllers/authLocal/SignUp.mjs"
import { checkToken } from "../../middleware/checkToken.mjs"

const routesAuthLocal = Router()

routesAuthLocal.post("/auth/sign-up", signUpLocal)
routesAuthLocal.post("/auth/login", loginLocal)
routesAuthLocal.post("/auth/confirm-code", checkToken, confirmCode)
routesAuthLocal.get("/auth/logout", logout)

export default routesAuthLocal
