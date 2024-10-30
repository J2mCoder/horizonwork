import Footer from "@/components/Footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { userAtom } from "@/contexts/UseUser"
import axios from "axios"
import imageCompression from "browser-image-compression"
import Cookies from "js-cookie"
import { Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FaTrashCan } from "react-icons/fa6"
import { SiGoogletagmanager } from "react-icons/si"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"

export const StepSetProfile = () => {
  const [image, setImage] = useState(null)
  const [imageBlob, setImageBlob] = useState(null)

  const [user, setUser] = useRecoilState(userAtom)
  const navigate = useNavigate()

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file))
    setImageBlob(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  })

  const sendImage = async () => {
    try {
      if (!imageBlob) {
        toast.warning("Veuillez sélectionner une image")
        return
      }
      const compressedFile = await imageCompression(imageBlob, options)
      const formData = new FormData()
      formData.append("image", compressedFile)

      console.log(compressedFile)
      axios
        .post("http://localhost:8000/api/set-profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data?.success === true) {
            toast.success(res.data?.message)
            console.log(res.data)
            navigate("/dashboard")
          }
        })
        .catch((err) => {
          if (err.response.data?.success === false) {
            toast.warning(err.response.data?.message)
            console.log(err.response.data)
          }
        })
    } catch (error) {
      console.error("Erreur lors de la compression de l'image:", error)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImageBlob(null)
  }

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="container mx-auto flex size-full flex-col gap-8 p-4 md:p-12">
        <div className="flex h-full justify-center">
          <div className="flex flex-col items-center gap-8">
            {/* Header section */}
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

            {/* Success message */}
            <div className="h-auto w-[90%] space-y-4 rounded-lg bg-white p-4 py-6 shadow-sm sm:w-[520px] md:px-10">
              <div className="flex flex-col items-center justify-center gap-2 p-4 font-semibold">
                <h2 className="text-center text-3xl font-bold text-customDark">
                  Félicitations!
                </h2>
                <p className="text-center leading-5 text-slate-600">
                  Votre compte a été créé avec succès. Vous pouvez personnaliser
                  votre profil ci-dessous.
                </p>
              </div>

              {/* Profile card with avatar upload */}
              <Card className="mx-auto w-full max-w-md">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-bold text-customDark">
                    Profil Utilisateur
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="size-36 object-cover">
                      {image ? (
                        <>
                          <AvatarImage
                            src={image}
                            alt="Profile"
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-100">
                            Profile
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-gray-100">
                          <Upload className="size-12 text-gray-500" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {image && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -right-5 -top-1 rounded-lg"
                        onClick={removeImage}>
                        <FaTrashCan className="size-3" />
                      </Button>
                    )}
                  </div>
                  <div
                    {...getRootProps()}
                    className={`w-full cursor-pointer rounded-lg border-2 border-dashed border-customDark p-8 text-center transition-colors ${
                      isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 hover:border-primary"
                    }`}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>{"Déposez l'image ici..."}</p>
                    ) : (
                      <p>
                        Glissez et déposez une image ici, ou cliquez pour
                        sélectionner un fichier
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between gap-3">
                <Button
                  onClick={sendImage}
                  className="w-1/2 bg-customDark font-semibold hover:bg-customDark/90">
                  Enregistrer
                </Button>
                <Button
                  variant="outline"
                  className="w-1/2 hover:border-customDark/35"
                  onClick={() => navigate("/dashboard")}>
                  Sauter
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex w-[85%] items-center justify-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
