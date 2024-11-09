import { Router } from "express"
import ProfileUserController from "../../controllers/ProfileUser/profileUserController.mjs"

const profileUserRoute = Router()

profileUserRoute.get("/user/profile", ProfileUserController)

export default profileUserRoute
