import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { userAtom } from "@/contexts/UseUser"
import { NavItems } from "@/widgets/NavItems"
import axios from "axios"
import { Bell, LogOut, Menu, Plus, Search, Settings, User } from "lucide-react"
import { useState } from "react"
import { SiGoogletagmanager } from "react-icons/si"
import { TbUsersPlus } from "react-icons/tb"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useRecoilValue } from "recoil"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const user = useRecoilValue(userAtom)

  const logOut = (e) => {
    e.preventDefault()
    axios
      .get("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data?.success === true) {
          toast.success(res.data?.message)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      })
      .catch((err) => {
        toast.warning("Une erreur est survenue")
        console.log(err)
      })
  }

  return (
    <header
      className="flex h-14 items-center fixed top-0 
    right-0 left-0 z-50 lg:left-[288px] bg-customLight border-b border-customDark/10 px-4 lg:px-6">
      <div className="flex flex-1 items-center">
        <SiGoogletagmanager className="text-customDark text-xl mr-1 block lg:hidden" />
        <h1 className=" font-bold text-slate-800 text-xl block lg:hidden">
          Horizon<span className="text-customDark">Work</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button className="hidden md:flex text-lg gap-2 text-customDark bg-white font-semibold border border-customDark  justify-between hover:bg-slate-200">
          <TbUsersPlus className="size-5" />
          <span>Equipe</span>
        </Button>
        <Button className="hidden md:flex text-lg gap-2 bg-customDark font-semibold  justify-between hover:bg-customDark/95">
          <Plus className="size-5" />
          <span>Projet</span>
        </Button>
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border border-customDark/15 hover:bg-customDark rounded-md hover:text-white font-bold text-customDark">
              <Search className="size-5" />
              <span className="sr-only">Recherche</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="text-customDark text-2xl">
                Recherche
              </DialogTitle>
            </DialogHeader>
            <Command>
              <CommandInput
                placeholder="Rechercher ..."
                className="placeholder:font-semibold"
              />
              <CommandList>
                <CommandEmpty className="text-xl text-center pt-4 font-semibold">
                  Pas de resultats trouver
                </CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem className="font-semibold">Calendar</CommandItem>
                  <CommandItem className="font-semibold">
                    Search Mails
                  </CommandItem>
                  <CommandItem className="font-semibold">
                    Search Projects
                  </CommandItem>
                  <CommandItem className="font-semibold">
                    Search Tasks
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          size="icon"
          className="border border-customDark/15 hover:bg-customDark rounded-md hover:text-white font-bold text-customDark">
          <Bell className="size-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div
          className="block 
        lg:hidden">
          <Sheet className="">
            <SheetTrigger className="outline-0 border-0 ring-0">
              <Button
                variant="ghost"
                size="icon"
                className="border border-customDark/15 hover:bg-customDark rounded-md hover:text-white font-bold text-customDark">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex flex-1 items-center">
                    <SiGoogletagmanager className="text-customDark text-2xl mr-1 block md:hidden" />
                    <h1 className=" font-bold text-slate-800 text-2xl block md:hidden">
                      Horizon<span className="text-customDark">Work</span>
                    </h1>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-4">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <DropdownMenu className="border border-customDark/15 rounded-md hover:text-white font-bold text-customDark">
          <DropdownMenuTrigger className="outline-0 bottom-0 ring-0">
            <Button
              variant="ghost"
              className=" size-10 rounded-full border-2 outline-0 border-customDark/15 hover:border-customDark font-bold">
              <Avatar className="size-8 outline-0 border-0">
                <AvatarImage
                  src={`http://localhost:8000/${user?.avatar}`}
                  alt="User"
                  className="object-cover"
                />
                <AvatarFallback className="text-customDark">{`${user?.firstname.charAt(
                  0
                )}${user?.lastname.charAt(0)}`}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{`${user?.firstname} ${user?.lastname}`}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {`${user?.email}`}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={"profile"} className="w-full flex items-center gap-2">
                <User className="mr-2 size-4" />
                <span>Profil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                onClick={logOut}
                className="w-full flex items-center gap-2 font-semibold">
                <LogOut className="mr-2 size-4" />
                <span>Déconnexion</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
