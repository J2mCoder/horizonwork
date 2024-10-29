import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express, { json, urlencoded } from "express"
import { connect_db } from "./config/db.mjs"
/* import { errorHandler } from "./middleware/errorHandler.mjs" */
import { checkSession } from "./middleware/checkSession.mjs"
import routesAuthLocal from "./routes/authLocalRoutes/authLocalRoutes.mjs"
import authUserVerificate from "./routes/authRouteVerificate/authVerificateRoute.mjs"

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
app.use(checkSession)
app.use("/api", routesAuthLocal)
app.use("/api", authUserVerificate)
/* app.use(errorHandler) */

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port http://localhost:${PORT}`)
})
