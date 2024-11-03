import { tokenData, userAtom } from "@/contexts/UseUser"
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function ProtectedAuth({ children }) {
  const user = useRecoilValue(userAtom)
  const token = useRecoilValue(tokenData)

  if (!user && !token) {
    return <Navigate to={"/"} />
  }

  if (!user) {
    Cookies.remove("token")
    return <Navigate to={"/"} />
  }

  if (user?.isEmailConfirmed && token && user) {
    return children
  }

  if (user?.isEmailConfirmed === false && token) {
    return <Navigate to={"/verify-code"} />
  }
}
