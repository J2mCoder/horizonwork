import passport from "passport"

export const auhtByGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
})

export const redirectToGoogle = passport.authenticate("google", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login",
})

export const redirectToHome = (req, res) => {
  req.session.user = req.user._id
  res.redirect("http://localhost:5173/dashboard")
}
