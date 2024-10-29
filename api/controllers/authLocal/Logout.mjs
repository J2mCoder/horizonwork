export const logout = (req, res) => {
  res.clearCookie("token")
  return res
    .status(200)
    .json({ success: true, message: "Deconnecté avec succés" })
}

export default logout
