import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { InputOTP } from "@/components/ui/input-otp"
import { userAtom } from "@/contexts/UseUser"
import axios from "axios"
import Cookies from "js-cookie"
import { useState } from "react"
import { ImSpinner } from "react-icons/im"
import { SiGoogletagmanager } from "react-icons/si"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"

export default function VerifyCode() {
  const [loader, setLoader] = useState(false)
  const [otp1, setOtp1] = useState("")
  const [otp2, setOtp2] = useState("")
  const [otp3, setOtp3] = useState("")
  const [otp4, setOtp4] = useState("")

  const [user, setUser] = useRecoilState(userAtom)
  const navigate = useNavigate()

  const handleSubmit = (d) => {
    d.preventDefault()
    setLoader(true)
    const codes = {
      code: otp1 + otp2 + otp3 + otp4,
    }
    console.log("Submitted OTP:", codes)

    axios
      .post("http://localhost:8000/api/auth/confirm-code", codes, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        if (res.data?.success === true) {
          toast.success(res.data.message)
          setUser(res.data.user)
          navigate("/auth-set-profile")
        }
      })
      .catch((err) => {
        if (err.data?.success === false) {
          toast.warning(err.data.message)
          console.log(err.response.data)
        }
      })
      .finally(() => {
        setLoader(false)
      })
  }

  console.log(otp1, otp2, otp3, otp4)
  return (
    <div className="h-screen w-screen overflow-x-hidden">
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
              <div className="container mx-auto w-[85%] md:w-2/3 ">
                <p className="text-center font-semibold text-slate-600">
                  Transformez votre façon de travailler avec HorizonWork. Gérez
                  vos projets et équipes facilement et boostez vos résultats !
                </p>
              </div>
            </div>
            <div className="h-auto w-[90%] space-y-4 rounded-lg bg-white p-4 py-6 shadow-sm sm:w-[520px] md:px-10">
              <div className="flex flex-col items-center justify-center gap-2 p-4 font-semibold">
                <h2 className="text-center text-3xl font-bold text-customDark">
                  Vérifiez votre email
                </h2>
                <p className="text-center leading-5 text-slate-600">
                  Nous avons envoyé un lien de vérification à votre adresse
                  email.
                </p>
              </div>
              <form
                method="post"
                onSubmit={handleSubmit}
                className="mt-3 flex flex-col gap-4">
                <div className="flex w-full items-center justify-center flex-row gap-2">
                  <div className="flex gap-3">
                    <InputOTP
                      value={otp1}
                      onChange={(e) => setOtp1(e.target.value)}
                    />
                    <InputOTP
                      value={otp2}
                      onChange={(e) => setOtp2(e.target.value)}
                    />
                  </div>
                  <div className=" size-2 rounded-full bg-customDark"></div>
                  <div className="flex gap-3">
                    <InputOTP
                      value={otp3}
                      onChange={(e) => setOtp3(e.target.value)}
                    />
                    <InputOTP
                      value={otp4}
                      onChange={(e) => setOtp4(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <p className="text-center text-sm font-semibold text-gray-500">
                    {
                      "Si vous ne voyez pas l'email, vérifiez votre dossier de spam."
                    }
                  </p>
                </div>
                <div className="mt-3 w-full">
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
                      "Valider"
                    )}
                  </Button>
                </div>
                <div className="w-full">
                  <Button
                    type="submit"
                    disabled={loader}
                    className="h-12 w-full border-2 bg-background text-lg font-semibold text-customDark hover:border-customDark hover:bg-background">
                    {loader ? (
                      <div className="flex items-center justify-center">
                        <ImSpinner className="animate-spin text-2xl" />
                        <span className="sr-only">Renvoi en cours...</span>
                      </div>
                    ) : (
                      "Renvoyer le lien de vérification"
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-center text-sm font-bold text-zinc-600">
                    {"Vous souhaitez modifier votre adresse email ? "}
                    <Link
                      to={"/change-email"}
                      className="underline hover:text-customDark">
                      Cliquez ici
                    </Link>
                  </p>
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
