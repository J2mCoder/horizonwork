import { catchAsync } from "../utils/catchAsync.mjs"

export const authLogout = catchAsync(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Une erreur est survenue" })
    }
    res.clearCookie("connect.sid")
    res.json({
      message: "vous avez bien êtes deconnecter",
    })
  })
})
