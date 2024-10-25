import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ValidateConfirmPassword,
  ValidatePassword,
} from "@/components/Validate"
import axios from "axios"
import { useState } from "react"
import { ImSpinner } from "react-icons/im"
import { SiGoogletagmanager } from "react-icons/si"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function ResetPassword() {
  const [loader, setLoader] = useState(false)
  const { token } = useParams()

  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const [errPassword, setErrPassword] = useState(false)
  const [errCpassword, setErrCpassword] = useState(false)

  const handleSubmit = (d) => {
    d.preventDefault()

    setErrPassword(ValidatePassword(password))
    setErrCpassword(ValidateConfirmPassword(cpassword, password))

    if (!errPassword && !errCpassword) {
      const data = {
        password: password,
        confirmPassword: cpassword,
      }

      setLoader(true)

      console.log(data)

      axios
        .post(`http://localhost:8000/api/auth/reset-password/${token}`, data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data, "jean")
        })
        .catch((err) => {
          toast.warning(err.response.data?.error)
          console.log(err.response.data, "erreur")
        })
        .finally(() => {
          setTimeout(() => {
            setLoader(false)
          }, 1000)
        })
    }
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="mx-auto flex size-full flex-col gap-8 p-4 md:container md:p-12">
        <div className="flex h-full justify-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <SiGoogletagmanager className="text-3xl text-customDark md:text-5xl" />
                <h1 className="text-3xl font-bold text-slate-800 md:text-6xl">
                  Horizon<span className="text-customDark">Work</span>
                </h1>
              </div>
              <div className="md:w-1/2 ">
                <p className="text-center font-semibold text-slate-600">
                  Transformez votre façon de travailler avec HorizonWork. Gérez
                  vos projets et équipes facilement et boostez vos résultats !
                </p>
              </div>
            </div>
            <div className="h-auto space-y-4 rounded-lg bg-white px-10 py-6 shadow-sm sm:w-[520px]">
              <div className="flex items-center justify-center p-4">
                <h2 className="text-center text-3xl font-bold text-customDark">{`Réinitialiser le mot de passe`}</h2>
              </div>
              <form
                method="post"
                onSubmit={handleSubmit}
                className="mt-3 flex flex-col gap-4">
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
                      "Mettre à jour le mot de passe"
                    )}
                  </Button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
