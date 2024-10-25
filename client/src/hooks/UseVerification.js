import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"

export default function useVerificate() {
  const [user, setUser] = useState(null)
  const User = useContext(UserContext)

  useEffect(() => {
    setUser(User)
  }, [User, user])
  console.log(user)

  return { user }
}
