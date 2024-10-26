import axios from "axios"
import Cookies from "js-cookie"
import { Fragment, useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Bounce, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "./components/Loader"
import { UserContext } from "./contexts/UserContext"
import Dashboard from "./page/Dashboard"
import ForgotPassword from "./page/ForgotPassword"
import Login from "./page/Login"
import MoreInfo from "./page/MoreInfo"
import NotFound from "./page/NotFund"
import ResetPassword from "./page/ResetPassword"
import SignUp from "./page/SignUp"
import { StepSetProfile } from "./page/StepSetProfile"
import VerifyEmail from "./page/VerifyEmail"

function App() {
  const [loader, setLoader] = useState(true)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Vérifiez ici
    setToken(Cookies.get("token"))
    axios
      .get("https://horizonwork-server.onrender.com", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response?.data)
        console.log(response?.data)
      })
      .catch(({ response }) => {
        if (response?.data.type === "error") {
          setUser(null)
        }
      })
    setTimeout(() => setLoader(false), 1000)
  }, [])

  console.log(token)

  return (
    <Fragment>
      {loader && <Loader />}
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" exact element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/auth-set-profile" element={<StepSetProfile />} />
            <Route path="/more-info" element={<MoreInfo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Fragment>
  )
}

export default App
