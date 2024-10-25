import { Router } from "express"
import {
  auhtByGoogle,
  redirectToGoogle,
  redirectToHome,
} from "../controllers/authGoogleController.mjs"
import { Unauthorized } from "../middleware/autorisationUser.mjs"

const routerAuthGoogle = Router()

routerAuthGoogle.get("/auth/google", Unauthorized, auhtByGoogle)
routerAuthGoogle.get(
  "/auth/google/callback",
  Unauthorized,
  redirectToGoogle,
  redirectToHome
)

export default routerAuthGoogle
