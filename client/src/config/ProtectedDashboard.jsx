import { tokenData, userAtom } from "@/contexts/UseUser"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function ProtectedDashboard({ children }) {
  const user = useRecoilValue(userAtom)
  const token = useRecoilValue(tokenData)

  console.log(user, token, "protected dashboard")
  if (!user && !token) {
    return <Navigate to={"/"} />
  }

  if (user?.isEmailConfirmed && token && user) {
    return children
  }

  if (user?.isEmailConfirmed === false && token) {
    return <Navigate to={"/verify-code"} />
  }
}
