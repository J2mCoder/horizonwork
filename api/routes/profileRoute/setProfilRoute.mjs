import express from "express"
import multer from "multer"
import { setProfile } from "../../controllers/setProfile/setProfile.mjs"

const setProfilRouter = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Dossier où les fichiers seront stockés
    cb(null, "public/images")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      file.mimetype.split("/")[1]
    cb(null, uniqueSuffix)
  },
})
const upload = multer({ storage: storage })

setProfilRouter.post("/set-profile", upload.single("image"), setProfile)

export default setProfilRouter
