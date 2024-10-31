import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express, { json, urlencoded } from "express"
import { connect_db } from "./config/db.mjs"
/* import { errorHandler } from "./middleware/errorHandler.mjs" */
import passport from "passport"
import configurePassport from "./config/passport.mjs"
import routesAuthLocal from "./routes/authLocalRoutes/authLocalRoutes.mjs"
import authUserVerificate from "./routes/authRouteVerificate/authVerificateRoute.mjs"
import setProfilRouter from "./routes/profileRoute/setProfilRoute.mjs"

const app = express()
const PORT = process.env.PORT || 8000
connect_db()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static("public/images"))
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)
configurePassport()
app.use(passport.initialize())
app.use("/api", routesAuthLocal)
app.use("/api", authUserVerificate)
app.use("/api", setProfilRouter)
/* app.use(errorHandler) */

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port http://localhost:${PORT}`)
})
