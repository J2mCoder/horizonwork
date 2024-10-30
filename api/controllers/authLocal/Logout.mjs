import { catchAsync } from "../../utils/catchAsync.mjs"

export const logout = catchAsync(async (req, res) => {
  await res.clearCookie("token")
  return res
    .status(200)
    .json({ success: true, message: "Deconnecté avec succés" })
})

export default logout
