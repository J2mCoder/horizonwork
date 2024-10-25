req.session.user = req.user._id
if (!req.user) {
  return res.status(401).json({
    message: "vous devez etre connecter pour acceder à cette page !",
    d: req.user,
    e: req.session,
  })
}

const checkUser = await User.findOne({ userId: req.user._id })

if (!checkUser) {
  await ProfileUser.findOneAndDelete({
    userId: req.user._id,
  })
  return res.status(401).json({ message: "Utilisateur n'existe pas !" })
}
const checkProfile = await ProfileUser.findOneAndUpdate(
  { userId: req.user._id },
  {
    $set: {
      lastLogin: Date.now(),
    },
  },
  { new: true }
)

if (!checkProfile) {
  const newProfile = await ProfileUser.create({
    userId: req.user._id,
    lastLogin: Date.now(),
  })

  newProfile && res.status(200).json(newProfile)
}

checkProfile.save()
checkProfile && res.status(200).json(checkProfile)
if (!emailConfirmationToken) {
  return res.status(404).json({ error: "Token inconnu" })
}

const checkTonken = await User.findOne({ emailConfirmationToken })

if (checkTonken.isEmailConfirmed === true) {
  return res.status(400).json({ message: "Ton email est deja confirmer" })
}

const updatedUser = await User.findOneAndUpdate(
  { emailConfirmationToken },
  { $set: { isEmailConfirmed: true, status: "activated" } },
  { new: true }
)

if (!updatedUser) {
  return res.status(404).json({ error: "Token inconnu" })
}

const sessionId = updatedUser._id
res.cookie("sessionId", sessionId, {
  maxAge: 90 * 24 * 60 * 60 * 1000,
  httpOnly: true,
})

if (updatedUser) {
  req.session.user = updatedUser._id
  req.user = updatedUser._id
  return res.redirect("/auth/check-profil")
}
/* export const confirmEmail = catchAsync(async (req, res) => {
  const emailConfirmationToken = req.params.id

  const findEmail = await User.findOne({ emailConfirmationToken })

  if (!findEmail) {
    return res.status(404).json({ error: "Token inconnu" })
  }

  if (findEmail.isEmailConfirmed === true) {
    return res.status(400).json({ message: "Ton email est deja confirmer" })
  }

  const updatedUser = await User.findOneAndUpdate(
    { emailConfirmationToken },
    { $set: { isEmailConfirmed: true, status: "active" } },
    { new: true }
  )

  await updatedUser.save()

  if (!updatedUser) {
    return res.status(404).json({ error: "Token inconnu" })
  }

  const sessionId = updatedUser._id
  res.cookie("sessionId", sessionId, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
  req.session.user = findEmail._id
  req.user = findEmail._id

  if (req.user || req.session.user) {
    return res.redirect("/api/auth/check-profil")
  }
}) */
