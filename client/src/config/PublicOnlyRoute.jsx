import { tokenData, userAtom } from "@/contexts/UseUser"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

// Composant de route protégée
export default function PublicOnlyRoute({ children }) {
  const user = useRecoilValue(userAtom)
  const token = useRecoilValue(tokenData)

  // Si l'utilisateur est authentifié, on bloque l'accès à certaines pages
  if (!user && !token) {
    return children
  }

  if (user?.isEmailConfirmed && token) {
    return <Navigate to={"/home"} />
  }

  if (!user?.isEmailConfirmed && token) {
    return <Navigate to={"/verify-code"} />
  }

  return children
}
