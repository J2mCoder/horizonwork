import { tokenData, userAtom } from "@/contexts/UseUser"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function ProtectedVerifyCode({ children }) {
  const user = useRecoilValue(userAtom)
  const token = useRecoilValue(tokenData)

  // Redirection vers la page d'accueil si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to={"/"} />
  }

  // Redirection vers le tableau de bord si l'utilisateur a confirmé son e-mail
  if (user?.isEmailConfirmed && token) {
    return <Navigate to={"/home"} />
  }

  if (user?.isEmailConfirmed && token && user.avatar === "default.png") {
    return <Navigate to={"/auth-set-profile"} />
  }

  // Si l'utilisateur n'est pas confirmé son e-mail et n'est pas connecté, on affiche les enfants
  return children
}
