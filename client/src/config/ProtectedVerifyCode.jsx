import { tokenData, userAtom } from "@/contexts/UseUser"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function ProtectedVerifyCode({ children }) {
  const user = useRecoilValue(userAtom)
  const token = useRecoilValue(tokenData)

  if (!user && !token) {
    return <Navigate to={"/"} />
  }

  if (user?.isEmailConfirmed && token) {
    return <Navigate to={"/dashboard"} />
  }

  if (!user?.isEmailConfirmed && token) {
    return children
  }
}
