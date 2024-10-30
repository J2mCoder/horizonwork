import { tokenData, userAtom } from "@/contexts/UseUser"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function ProtectedLogin({ children }) {
  const user = useRecoilValue(userAtom)
  const token = useRecoilValue(tokenData)

  if (user?.isEmailConfirmed && token && user) {
    return <Navigate to="/dashboard" replace />
  }

  if (token && !user?.isEmailConfirmed && user) {
    return <Navigate to="/verify-code" replace />
  }

  return children
}
