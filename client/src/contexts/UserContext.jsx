import { createContext, useState } from "react"

const userContext = createContext()
export default function UserContext({ children }) {
  const [user, setUser] = useState(null)

  const login = () => {}

  const logout = () => {}

  const signup = () => {}

  return (
    <userContext.Provider value={{ user, setUser, login, logout, signup }}>
      {children}
    </userContext.Provider>
  )
}
