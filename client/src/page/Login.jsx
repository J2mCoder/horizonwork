import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ValidateEmail, ValidatePassword } from "@/components/Validate"
import axios from "axios"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { ImSpinner } from "react-icons/im"
import { SiGoogletagmanager } from "react-icons/si"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function Login() {
  const [loader, setLoader] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)

  const handleSubmit = (d) => {
    d.preventDefault()

    setErrEmail(ValidateEmail(email))
    setErrPassword(ValidatePassword(password))

    if (!errEmail && !errPassword) {
      const data = {
        email: email,
        password: password,
      }

      setLoader(true)

      axios
        .post("http://localhost:8080/api/auth/login", data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data, "jean")
        })
        .catch((err) => {
          console.log(err.response.data)
          if (err.response.data.success === false) {
            toast.warning(err.response.data.message)
          }
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
              <div className="w-[85%] md:w-2/3  ">
                <p className="text-center font-semibold text-slate-600">
                  Transformez votre façon de travailler avec HorizonWork. Gérez
                  vos projets et équipes facilement et boostez vos résultats !
                </p>
              </div>
            </div>
            <div className="h-auto w-[90%] space-y-4 rounded-lg bg-white p-4 py-6 shadow-sm sm:w-[520px] md:px-10">
              <div className="flex items-center justify-center p-4">
                <h2 className="text-center text-3xl font-bold text-customDark">
                  Se connecter
                </h2>
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
                    <span className="text-lg">{`Se connecter avec Google`}</span>
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
                  <Link
                    to={"/forgot-password"}
                    className="float-right mt-2 text-sm font-bold text-zinc-600 underline hover:text-customDark">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="my-3 w-full">
                  <Button
                    type="submit"
                    disabled={loader}
                    className="h-12 w-full bg-customDark text-xl font-bold hover:bg-customDark/95">
                    {loader ? (
                      <div className="flex items-center justify-center">
                        <ImSpinner className="animate-spin text-2xl" />
                        <span className="sr-only">Chargement...</span>
                      </div>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    to={"/sign-up"}
                    className="text-center text-sm font-bold text-zinc-600">
                    {"Vous n'avez pas de compte ? "}
                    <span className=" underline hover:text-customDark">
                      Inscrivez-vous
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
