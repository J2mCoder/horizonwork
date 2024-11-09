import axios from "axios"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Bounce, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRecoilState } from "recoil"
import Loader from "./components/Loader"
import ProtectedAuth from "./config/ProtectedAuth"
import ProtectedHome from "./config/ProtectedHome"
import ProtectedLogin from "./config/ProtectedLogin"
import ProtectedSetProfil from "./config/ProtectedSetProfil"
import ProtectedSignup from "./config/ProtectedSignup"
import ProtectedVerifyCode from "./config/ProtectedVerifyCode"
import PublicOnlyRoute from "./config/PublicOnlyRoute"
import { LoaderAtom, tokenData, userAtom } from "./contexts/UseUser"
import ForgotPassword from "./page/ForgotPassword"
import Home from "./page/Home"
import Login from "./page/Login"
import NotFound from "./page/NotFund"
import ResetPassword from "./page/ResetPassword"
import SignUp from "./page/SignUp"
import { StepSetProfile } from "./page/StepSetProfile"
import VerifyCode from "./page/VerifyCode"
import Dashboard from "./widgets/Dashboard"
import Member from "./widgets/Member"
import Profile from "./widgets/Profile"
import Project from "./widgets/Project"

function App() {
  const [loader, setLoader] = useRecoilState(LoaderAtom)
  const [user, setUser] = useRecoilState(userAtom)
  const [token, setToken] = useRecoilState(tokenData)

  console.log(user, token)
  useEffect(() => {
    if (Cookies.get("token")) {
      setToken(Cookies.get("token"))
    }

    axios
      .get("http://localhost:8000/api/verify-user", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setUser(response?.data.user)
        setToken(response?.data.token)
        console.log(response, "app response")
      })
      .catch((err) => {
        setUser(null)
        setToken(null)
        Cookies.remove("token")
        console.log(err, "app error")
      })
      .finally(() => setLoader(false))
  }, [])

  console.log(token, "token app page")

  return loader ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <ProtectedSignup>
                <SignUp />
              </ProtectedSignup>
            }
          />
          <Route
            path="/"
            exact
            element={
              <ProtectedLogin>
                <Login />
              </ProtectedLogin>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <PublicOnlyRoute>
                <ResetPassword />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/verify-code"
            element={
              <ProtectedVerifyCode>
                <VerifyCode />
              </ProtectedVerifyCode>
            }
          />
          <Route
            path="/auth-set-profile"
            element={
              <ProtectedSetProfil>
                <StepSetProfile />
              </ProtectedSetProfil>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedHome>
                <Home />
              </ProtectedHome>
            }>
            <Route
              path=""
              exact={true}
              element={
                <ProtectedAuth>
                  <Dashboard />
                </ProtectedAuth>
              }
            />
            <Route
              path="project"
              element={
                <ProtectedAuth>
                  <Project />
                </ProtectedAuth>
              }
            />
            <Route
              path="members"
              element={
                <ProtectedAuth>
                  <Member />
                </ProtectedAuth>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedAuth>
                  <Profile />
                </ProtectedAuth>
              }
            />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
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
    </>
  )
}

export default App
