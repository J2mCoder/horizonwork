import PropTypes from "prop-types"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useVerificate from "../hooks/UseVerification"

const ProtectedRoute = ({ children }) => {
  const { user } = useVerificate()
  const navigate = useNavigate()

  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    if (!user) {
      navigate("/", { replace: true })
    }
    // Sinon, affiche le composant enfant
    return () => {
      // Supprimer la redirection lorsque le composant est démonté
      return children
    }
  })

  // Sinon, affiche le composant enfant
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
