export const tcheckSession = (req, res, next) => {
  if (req.user || req.session.user) {
    return next()
  } else {
    return res.status(403).json({
      error:
        "Accès refusé : Vous devez être connecté pour accéder à cette ressource.",
    })
  }
}
