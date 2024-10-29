import { tokenData, userAtom } from "@/contexts/UseUser"
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
    return <Navigate to={"/dashboard"} />
  }

  if (!user?.isEmailConfirmed && token) {
    return <Navigate to={"/verify-code"} />
  }
}
