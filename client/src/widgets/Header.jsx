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
import { NavItems } from "@/widgets/NavItems"
import { Bell, LogOut, Menu, Search, Settings } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <header className="flex h-14 items-center border-b border-customDark/10 px-4 lg:px-6">
      <div className="flex flex-1 items-center">
        <span className="text-xl font-bold md:hidden">HorizonWork</span>
      </div>
      <div className="flex items-center gap-4">
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
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
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-4">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-8 rounded-full">
              <Avatar className="size-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
