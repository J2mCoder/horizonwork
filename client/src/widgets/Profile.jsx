import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { flagsAtoms, profileAtom } from "@/contexts/UseUser"
import axios from "axios"
import Cookies from "js-cookie"
import { Flag, MoreHorizontal } from "lucide-react"
import { useEffect } from "react"
import { IoPencilOutline } from "react-icons/io5"
import { useRecoilState } from "recoil"

export default function Profile() {
  const [user, setUser] = useRecoilState(profileAtom)
  const [flags, setFlags] = useRecoilState(flagsAtoms)

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/profile", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        if (res.data?.success === true) {
          setUser(res.data?.user)
          setFlags(res.data?.flagsAll)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const tecn = console.log(user, flags)
  return (
    <div className="">
      <div className="flex flex-col xl:flex-row justify-between gap-3">
        {/* Première carte (Profile) */}
        <div className="flex-1 w-full xl:w-2/3 flex flex-col space-y-3">
          <Card className="overflow-hidden pb-4">
            <div className="relative">
              {/* Gradient Banner */}
              <div className="h-48 w-full bg-circle-wave rounded-b-lg"></div>
              <div className="px-6">
                {/* Avatar */}
                <div className="relative -mt-20 mb-4">
                  <Avatar className="w-32 h-32 ring-4 ring-offset-2 relative ring-customDark">
                    <AvatarImage
                      src={`http://localhost:8000/${user?.avatar}`}
                      alt="Profile picture"
                      className="object-cover"
                    />
                    <AvatarFallback>{`${user?.firstname.charAt(
                      0
                    )}${user?.lastname.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col lg:flex-row justify-between items-start">
                  <div className="space-y-3 w-full">
                    <div>
                      <div className="flex justify-between">
                        <h1 className="text-2xl font-bold text-customDark whitespace-nowrap">
                          {`${user?.firstname} ${user?.lastname}`}
                        </h1>
                        <div className="flex gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="bg-customDark rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white bg-customDark hover:bg-customDark/95 hover:text-white focus:ring ring-offset-2 ring-customDark">
                                <MoreHorizontal className="h-4 w-4 text-lg" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuItem>
                                Copy profile link
                              </DropdownMenuItem>
                              <DropdownMenuItem>Share via...</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Block user
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white bg-customDark hover:bg-customDark/95 hover:text-white focus-within:ring ring-offset-2 ring-customDark">
                            <IoPencilOutline className="h-4 w-4 text-2xl" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-customDark/95 font-semibold gap-2 text-sl mt-1">
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Flag className="h-4 w-4" />
                        <span>Kinshasa, DRC</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          @{user?.username}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded bg-customDark" />
                          <span className="whitespace-nowrap">
                            Developpeur fullstack
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="flex w-full">
              <div className="flex justify-between items-center">
                <div className="">
                  <CardTitle className="text-2xl font-bold text-customDark whitespace-nowrap">
                    Biographie
                  </CardTitle>
                </div>
                <div className="">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white bg-customDark hover:bg-customDark/95 hover:text-white focus-within:ring ring-offset-2 ring-customDark"
                    // Fonction pour l'édition
                  >
                    <IoPencilOutline className="h-5 w-5" />
                    <span className="sr-only">Éditer la biographie</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="w-full bg-customLight/60 pt-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl text-center font-bold text-customDark">
                    Il semble que vous n'ayez pas encore ajouté de biographie à
                    votre profil.
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center bg-customLight/60 py-4">
                  <p className="text-customDark/65 font-medium">
                    Ajoutez une biographie pour mieux vous présenter aux autres.
                  </p>
                  <div className="mt-4">
                    <Button className="bg-customDark hover:bg-customDark/95 focus-within:ring ring-offset-2 ring-customDark">
                      Ajouter une biographie
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="flex w-full">
              <div className="flex justify-between items-center">
                <div className="">
                  <CardTitle className="text-2xl font-bold text-customDark whitespace-nowrap">
                    Technologies
                  </CardTitle>
                </div>
                <div className="">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white bg-customDark hover:bg-customDark/95 hover:text-white focus-within:ring ring-offset-2 ring-customDark"
                    // Fonction pour l'édition
                  >
                    <IoPencilOutline className="h-5 w-5" />
                    <span className="sr-only">Éditer la description</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="w-full bg-customLight/60 pt-3">
              {tecn ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-center">
                  <Card className="flex items-center p-3">
                    <div className="flex items-center">
                      <Avatar className="flex items-center">
                        <AvatarImage
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                          alt="placeholder"
                          className="size-8"
                        />
                      </Avatar>
                    </div>
                    <div className="">
                      <h4 className="text-lg font-semibold text-customDark whitespace-nowrap ">
                        JavaScript
                      </h4>
                      <p className="text-sm text-customDark/65 whitespace-nowrap font-medium">
                        Lorem ipsum
                      </p>
                    </div>
                  </Card>

                  <Card className="flex items-center p-3">
                    <div className="flex items-center">
                      <Avatar className="flex items-center">
                        <AvatarImage
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                          alt="placeholder"
                          className="size-8"
                        />
                      </Avatar>
                    </div>
                    <div className="">
                      <h4 className="text-lg font-semibold text-customDark whitespace-nowrap ">
                        JavaScript
                      </h4>
                      <p className="text-sm text-customDark/65 whitespace-nowrap font-medium">
                        Lorem ipsum
                      </p>
                    </div>
                  </Card>
                  <Card className="flex items-center p-3">
                    <div className="flex items-center">
                      <Avatar className="flex items-center">
                        <AvatarImage
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                          alt="placeholder"
                          className="size-8"
                        />
                      </Avatar>
                    </div>
                    <div className="">
                      <h4 className="text-lg font-semibold text-customDark whitespace-nowrap ">
                        JavaScript
                      </h4>
                      <p className="text-sm text-customDark/65 whitespace-nowrap font-medium">
                        Lorem ipsum
                      </p>
                    </div>
                  </Card>
                  <Card className="flex items-center p-3">
                    <div className="flex items-center">
                      <Avatar className="flex items-center">
                        <AvatarImage
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                          alt="placeholder"
                          className="size-8"
                        />
                      </Avatar>
                    </div>
                    <div className="">
                      <h4 className="text-lg font-semibold text-customDark whitespace-nowrap ">
                        JavaScript
                      </h4>
                      <p className="text-sm text-customDark/65 whitespace-nowrap font-medium">
                        Lorem ipsum
                      </p>
                    </div>
                  </Card>
                </div>
              ) : (
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center font-bold text-customDark">
                      Il semble que vous n'ayez pas encore ajouté de
                      technologies ou de frameworks à votre profil.
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center bg-customLight/60 py-4">
                    <p className="text-customDark/65 font-medium">
                      Ajoutez les technologies que vous utilisez pour mieux
                      présenter vos compétences.
                    </p>
                    <div className="mt-4">
                      <Button className="bg-customDark hover:bg-customDark/95 focus-within:ring ring-offset-2 ring-customDark">
                        Ajouter une technologie
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex w-full">
              <div className="flex justify-between items-center">
                <div className="">
                  <CardTitle className="text-2xl font-bold text-customDark whitespace-nowrap">
                    Informations personnelles
                  </CardTitle>
                </div>
                <div className="">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white bg-customDark hover:bg-customDark/95 hover:text-white focus-within:ring ring-offset-2 ring-customDark"
                    // Fonction pour l'édition
                  >
                    <IoPencilOutline className="h-5 w-5" />
                    <span className="sr-only">Éditer la description</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="bg-customLight/60 pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              natus porro possimus aperiam deleniti asperiores dolorem magni
              doloremque sint exercitationem, adipisci doloribus culpa ratione
              iste eius dicta ex repudiandae laborum.
            </CardContent>
          </Card>
        </div>

        {/* Deuxième carte (Description) */}
        <Card className="w-full hidden xl:flex xl:w-1/3 h-fit">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem at
            deserunt itaque doloribus molestias tempore eveniet, mollitia beatae
            eius aliquid officiis obcaecati eligendi architecto pariatur qui
            libero nostrum unde nam.
          </p>
        </Card>
      </div>
    </div>
  )
}
