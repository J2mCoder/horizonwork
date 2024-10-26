import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express, { json, urlencoded } from "express"
import { connect_db } from "./config/db.mjs"
import { Unauthorized } from "./middleware/autorisationUser.mjs"
/* import { errorHandler } from "./middleware/errorHandler.mjs" */
import routesAuthLocal from "./routes/authLocalRoutes/authLocalRoutes.mjs"

const app = express()
const PORT = process.env.PORT || 8000
connect_db()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)
app.use("/api", routesAuthLocal)
/* app.use(errorHandler) */

console.log(process.env.PASS_KEY_MAIL)

app.get("/api/home", Unauthorized, (req, res) => {
  if (req.user || req.session.user) {
    return res.status(200).json({
      message: "welcome to home page",
      user: req.user || req.session.user,
    })
  }
  return res.status(401).json({
    errorMsg: "vous devez etre connecter pour acceder à cette page!",
    type: "error",
  })
})

app.get("/", (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        name: "Test 1",
        description: "Description test 1",
      },
      {
        id: 2,
        name: "Test 2",
        description: "Description test 2",
      },
    ],
  })
})

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port http://localhost:${PORT}`)
})
