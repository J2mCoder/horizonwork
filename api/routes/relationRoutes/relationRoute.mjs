import express from "express"
import MemberRelation from "../../controllers/RelationMember/MemberRelation.mjs"

const relationRoute = express.Router()

relationRoute.get("/relation/members", MemberRelation)

export default relationRoute
