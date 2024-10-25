import ProfileUser from "../model/profileSchema.mjs"
import User from "../model/UserSchema/User.Model.mjs"
import { catchAsync } from "../utils/catchAsync.mjs"

export const sessionAuthUser = catchAsync(async (req, res) => {
  if (!req.user && !req.session.user) {
    return res.status(401).json({
      error: "vous devez etre connecter pour acceder à cette page !",
    })
  }

  const userId = req.user?._id || req.session?.user

  const user = await User.findById({ userId })

  if (!user) {
    await ProfileUser.findOneAndDelete({ userId: req.user?._id })
    return res
      .status(401)
      .json({ message: "Utilisateur n'existe pas !", d: req.session })
  }

  const checkProfile = await ProfileUser.findOneAndUpdate(
    { userId: req.user._id },
    {
      $set: {
        lastLogin: Date.now(),
      },
    }
  )

  if (!checkProfile) {
    const newProfile = await ProfileUser.create({
      userId: req.user._id,
      lastLogin: Date.now(),
    })
    newProfile && res.status(200).json(newProfile)
  }

  return res.redirect("/api/home")
})
