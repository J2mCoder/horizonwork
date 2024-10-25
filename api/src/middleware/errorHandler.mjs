export const errorHandler = (err, req, res, next) => {
  console.log("Erreur capturée :", err)
  if (err.code === 11000) {
    return res.status(400).json({
      error: "L'utilisateur existe déjà.",
    })
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }

  if (err.name === "TokenError") {
    res.status(500).redirect("api/auth/login")
  }

  return res.status(500).json({ error: "Une erreur est survenue.", err })
}
