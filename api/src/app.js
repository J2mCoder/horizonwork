import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express, { json, urlencoded } from "express"
import expressSession from "express-session"
import passport from "passport"
import { connect_db } from "./config/db.mjs"
import configurePassport from "./config/passport.mjs"
import { Unauthorized } from "./middleware/autorisationUser.mjs"
import { errorHandler } from "./middleware/errorHandler.mjs"
import routerAuthGoogle from "./routes/authGoogleRoutes.mjs"
import routesAuthLocal from "./routes/authLocalRoutes/authLocalRoutes.mjs"
import routesAuthLogout from "./routes/authLogoutRoutes.mjs"

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
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
)

app.use(
  expressSession({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.URL_DB,
      collectionName: "sessions",
      ttl: 90 * 24 * 60 * 60,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
    },
    user: (req, res) => {
      if (req.user || req.session.user) {
        const userSession = req.session.user || req.user
        return userSession
      } else {
        return null
      }
    },
  })
)
configurePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", routerAuthGoogle)
app.use("/api", routesAuthLogout)
app.use("/api", routesAuthLocal)
app.use(errorHandler)

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

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port http://localhost:${PORT}`)
})
