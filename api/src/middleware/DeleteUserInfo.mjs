import ProfileUser from "../model/profileSchema.mjs"
import User from "../model/userSchema.mjs"

export const deleteUserInfo = async (req, res, next) => {
  const allProfile = await ProfileUser.deleteMany({
    userId: {
      $nin: await User.distinct("_id"),
    },
  })
}
