import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import useVerificate from "../hooks/UseVerification"

const PublicOnlyRoute = ({ children }) => {
  const { user } = useVerificate()
  const navigation = useNavigate()
  // Si l'utilisateur est déjà connecté, redirige vers la page d'accueil ou le tableau de bord
  if (user) {
    navigation("/dashboard")
  }

  // Sinon, affiche le composant enfant
  return children
}

PublicOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PublicOnlyRoute
