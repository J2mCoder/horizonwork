import { tokenData, userAtom } from "@/contexts/UseUser"
import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

/**
 * Composant de route protégée pour la page de profil
 * Vérifie si l'utilisateur est authentifié et si son e-mail est confirmée
 * Si oui, redirige vers le tableau de bord si l'utilisateur a déjà mis à jour son avatar
 * Si non, redirige vers la page de mise à jour du profil
 * Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
 * Si l'utilisateur est authentifié mais n'a pas confirmé son e-mail, redirige vers la page de confirmation de l'e-mail
 */
export default function ProtectedSetProfil({ children }) {
  const user = useRecoilValue(userAtom)
  const token = useRecoilValue(tokenData)

  // Si l'utilisateur n'est pas authentifié, on redirige vers la page de connexion
  if (!user && !token) {
    return <Navigate to={"/"} />
  }

  // Si l'utilisateur est authentifié et que son e-mail est confirmée
  // On redirige vers le tableau de bord si l'utilisateur a déjà mis à jour son avatar
  if (user?.isEmailConfirmed && token && user.avatar !== "default.png") {
    return <Navigate to={"/home"} />
  }

  // Si l'utilisateur est authentifié et que son e-mail est confirmée
  // On redirige vers la page de mise à jour du profil si l'utilisateur n'a pas encore mis à jour son avatar
  if (user?.isEmailConfirmed && token && user.avatar === "default.png") {
    return children
  }

  // Si l'utilisateur est authentifié mais n'a pas confirmé son e-mail
  // On redirige vers la page de confirmation de l'e-mail
  if (!user?.isEmailConfirmed && token) {
    return <Navigate to={"/verify-code"} />
  }

  // Si l'utilisateur n'est pas authentifié, on redirige vers la page de connexion
  if (!user && token) {
    return <Navigate to={"/"} />
  }

  return null
}
