import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ValidateConfirmPassword,
  ValidateEmail,
  ValidateFirstname,
  ValidateLastname,
  ValidatePassword,
  ValidateUsername,
} from "@/components/Validate"
import { userAtom } from "@/contexts/UseUser"
import axios from "axios"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { ImSpinner } from "react-icons/im"
import { SiGoogletagmanager } from "react-icons/si"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"

export default function SignUp() {
  const [loader, setLoader] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const [user, setUser] = useRecoilState(userAtom)
  console.log(user)

  const [errFname, setErrFname] = useState(false)
  const [errLname, setErrLname] = useState(false)
  const [errUsername, setErrUsername] = useState(false)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)
  const [errCpassword, setErrCpassword] = useState(false)

  const navigation = useNavigate()

  const handleSubmit = (d) => {
    d.preventDefault()

    setErrFname(ValidateFirstname(firstname))
    setErrLname(ValidateLastname(lastname))
    setErrUsername(ValidateUsername(username))
    setErrEmail(ValidateEmail(email))
    setErrPassword(ValidatePassword(password))
    setErrCpassword(ValidateConfirmPassword(cpassword, password))

    if (
      !errFname &&
      !errLname &&
      !errUsername &&
      !errEmail &&
      !errPassword &&
      !errCpassword
    ) {
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        confirmPassword: cpassword,
      }

      setLoader(true)

      if (!data) {
        return toast.error("une erreur est survenu")
      }
      console.log(data)

      axios
        .post("http://localhost:8000/api/auth/sign-up", data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res)
          if (res.data?.success === true) {
            toast.success(res.data?.message)
            setUser(res.data?.user)
            setTimeout(() => {
              navigation("/verify-email")
            }, 1000)
            console.log(res.data)
          }
        })
        .catch((err) => {
          console.log(err, "erreur")
          /* toast.warning(err.response.data?.error) */
        })
        .finally(() => {
          setTimeout(() => {
            setLoader(false)
          }, 1000)
        })
    }
  }

  const HandleGoogle = () => {
    window.open("http://localhost:8080/api/auth/google", "_self")
  }
  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      <div className="container mx-auto flex size-full flex-col gap-8 p-4 md:p-12">
        <div className="flex h-full justify-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <SiGoogletagmanager className="text-3xl text-customDark md:text-5xl" />
                <h1 className="text-3xl font-bold text-slate-800 md:text-6xl">
                  Horizon<span className="text-customDark">Work</span>
                </h1>
              </div>
              <div className="w-[85%] md:w-2/3 ">
                <p className="text-center font-semibold text-slate-600">
                  Transformez votre façon de travailler avec HorizonWork. Gérez
                  vos projets et équipes facilement et boostez vos résultats !
                </p>
              </div>
            </div>
            <div className="h-auto w-[90%] space-y-4 rounded-lg bg-white p-4 py-6 shadow-sm sm:w-[520px] md:px-10">
              <div className="flex items-center justify-center p-4">
                <h2 className="text-center text-3xl font-bold text-customDark">{`S'inscrire`}</h2>
              </div>
              <form
                method="post"
                onSubmit={handleSubmit}
                className="mt-3 flex flex-col gap-4">
                <div className="flex items-center justify-center">
                  <Button
                    onClick={HandleGoogle}
                    type="button"
                    className="flex h-12 w-full gap-3 border bg-customLight text-customDark hover:bg-customLight/5">
                    <FcGoogle className="text-2xl" />
                    <span className="text-lg">{`S'inscrire avec Google`}</span>
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-0.5 w-full bg-gray-300/35"></div>
                  <div className="mx-3 flex items-center justify-center">
                    <span className="text-lg font-semibold text-customDark">
                      Ou
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-gray-300/35"></div>
                </div>
                <div className="flex w-full flex-col gap-3 md:flex-row md:justify-between">
                  <div className="w-full">
                    <Input
                      type="text"
                      placeholder="Prénom"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    {errFname && (
                      <Label className="text-sm text-red-600">{errFname}</Label>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      placeholder="Nom de famille"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    {errLname && (
                      <Label className="text-sm text-red-600">{errLname}</Label>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errUsername && (
                    <Label className="text-sm text-red-600">
                      {errUsername}
                    </Label>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    type="email"
                    placeholder="Adresse email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errEmail && (
                    <Label className="text-sm text-red-600">{errEmail}</Label>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errPassword && (
                    <Label className="text-sm text-red-600">
                      {errPassword}
                    </Label>
                  )}
                </div>
                <div className="w-full">
                  <Input
                    type="password"
                    placeholder="confirmation du mot de passe"
                    name="confirm_password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                  {errCpassword && (
                    <Label className="text-sm text-red-600">
                      {errCpassword}
                    </Label>
                  )}
                </div>
                <div className="my-3 w-full">
                  <Button
                    type="submit"
                    disabled={loader}
                    className="h-12 w-full bg-customDark text-xl font-bold hover:bg-customDark/95">
                    {loader ? (
                      <div className="flex items-center justify-center">
                        <ImSpinner className="animate-spin text-2xl" />
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "S'inscrire"
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    to={"/"}
                    className="text-center text-sm font-bold text-zinc-600">
                    Vous avez déjà un compte ?{" "}
                    <span className=" underline hover:text-customDark">
                      Connectez-vous
                    </span>
                  </Link>
                </div>
              </form>
            </div>
            <div className="flex w-[85%] items-center justify-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
