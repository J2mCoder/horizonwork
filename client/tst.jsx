<div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Project Dashboard</h1>
            <Button>New Project</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <ListTodo className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  2 completed this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Tasks
                </CardTitle>
                <Clock className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground">
                  12 due this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  2 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Project Progress
                </CardTitle>
                <BarChart className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <Progress value={68} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: "Alice",
                      action: "completed task",
                      project: "Website Redesign",
                    },
                    {
                      user: "Bob",
                      action: "added new task",
                      project: "Mobile App",
                    },
                    {
                      user: "Charlie",
                      action: "commented on",
                      project: "Database Migration",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="size-9">
                        <AvatarImage
                          src={`/placeholder-user.jpg`}
                          alt={activity.user}
                        />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action} on {activity.project}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Projects</CardTitle>
                <CardDescription>4 of 12 projects in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Website Redesign", progress: 75 },
                    { name: "Mobile App", progress: 40 },
                    { name: "Database Migration", progress: 60 },
                    { name: "API Integration", progress: 25 },
                  ].map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {project.progress}%
                        </div>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>


<div className="flex h-full flex-col">
          <div className="mb-8 flex items-center fixed bg-white">
            <SiGoogletagmanager className="text-customDark text-2xl" />
            <h1 className=" font-bold text-slate-800 text-2xl">
              Horizon<span className="text-customDark">Work</span>
            </h1>
          </div>
          <nav className="flex flex-1 flex-col space-y-2">
            <NavItems />
          </nav>
          <div className="mt-auto border-t pt-4">
            <div className="mb-4 flex items-center">
              <Avatar className="mr-3 size-10">
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start">
                <Settings className="mr-2 size-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={logOut}>
                <LogOut className="mr-2 size-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>


/* const NavItems = () => (
  <>
    <Link
      className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
      href="#">
      <Home className="size-4" />
      <span>Home</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
      href="#">
      <BarChart className="size-4" />
      <span>Projects</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
      href="#">
      <ListTodo className="size-4" />
      <span>Tasks</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
      href="#">
      <Users className="size-4" />
      <span>Team</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
      href="#">
      <Calendar className="size-4" />
      <span>Calendar</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
      href="#">
      <FileText className="size-4" />
      <span>Reports</span>
    </Link>
  </>
)

<div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 border-r bg-red-500 p-6 md:block">
        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-center">
            <span className="text-xl font-bold">HorizonWork</span>
          </div>
          <nav className="flex flex-1 flex-col space-y-2">
            <NavItems />
          </nav>
          <div className="mt-auto border-t pt-4">
            <div className="mb-4 flex items-center">
              <Avatar className="mr-3 size-10">
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start">
                <Settings className="mr-2 size-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={logOut}>
                <LogOut className="mr-2 size-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col bg-green-400 overflow-hidden">
        <header className="flex h-14 items-center border-b px-4 lg:px-6">
          <div className="flex flex-1  items-center">
            <span className="text-xl font-bold md:hidden">HorizonWork</span>
          </div>
          <div className="flex bg-blue-400 items-center gap-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="size-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <Command>
                  <CommandInput placeholder="Type to search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>Calendar</CommandItem>
                      <CommandItem>Search Mails</CommandItem>
                      <CommandItem>Search Projects</CommandItem>
                      <CommandItem>Search Tasks</CommandItem>
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
                <Button
                  variant="ghost"
                  className="relative size-8 rounded-full">
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

        {/* Dashboard content */}
        <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Project Dashboard</h1>
            <Button>New Project</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <ListTodo className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  2 completed this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Tasks
                </CardTitle>
                <Clock className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground">
                  12 due this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  2 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Project Progress
                </CardTitle>
                <BarChart className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <Progress value={68} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: "Alice",
                      action: "completed task",
                      project: "Website Redesign",
                    },
                    {
                      user: "Bob",
                      action: "added new task",
                      project: "Mobile App",
                    },
                    {
                      user: "Charlie",
                      action: "commented on",
                      project: "Database Migration",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="size-9">
                        <AvatarImage
                          src={`/placeholder-user.jpg`}
                          alt={activity.user}
                        />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action} on {activity.project}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Projects</CardTitle>
                <CardDescription>4 of 12 projects in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Website Redesign", progress: 75 },
                    { name: "Mobile App", progress: 40 },
                    { name: "Database Migration", progress: 60 },
                    { name: "API Integration", progress: 25 },
                  ].map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {project.progress}%
                        </div>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div> */

/* import { temoignages } from "@/components/Testimony"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { LuQuote } from "react-icons/lu"
import { SiGoogletagmanager } from "react-icons/si"

export default function Login() {
  return (
    <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-[80%] h-[90%] shadow-md bg-white rounded-lg">
        <div className=" bg-slate-100 hidden lg:flex flex-col m-6 rounded-lg p-6 h-[92%]">
          <div className="flex items-center gap-2">
            <SiGoogletagmanager className="text-3xl text-blue-900" />
            <h1 className="text-3xl font-bold">
              Horizon<span className="text-blue-900">Work</span>
            </h1>
          </div>
          <div className="flex-1 flex items-center">
            <div className="space-y-3 lg:space-y-6">
              <h2 className="text-3xl font-semibold">
                {`Améliorez la collaboration au sein de votre équipe`}
              </h2>
              <p className="text-sm text-slate-500 font-semibold">
                {`Accélérez la productivité de votre équipe avec HorizonWork ! Organisez vos tâches, fixez des objectifs et améliorez la communication interne grâce à une plateforme pensée pour l'efficacité. Connectez-vous dès aujourd'hui et transformez la manière dont vous travaillez ensemble !`}
              </p>
            </div>
          </div>
          <div className=" row-span-2 flex justify-center items-center">
            <Carousel className=" w-[85%]">
              <CarouselContent>
                {temoignages.map((temoignage, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <LuQuote className=" absolute ml-4 text-4xl -top-1 text-slate-200" />
                        <CardContent className="aspect-video bg-blue-950 p-0 flex items-center">
                          <div className="w-full h-full flex items-center p-4">
                            <div className="gap-8">
                              <p className="text-lg font-bold mt-3 text-slate-300 font-flower leading-5">
                                {temoignage.message}
                              </p>
                              <div className="w-full gap-2 flex items-center mt-3">
                                <Avatar>
                                  <AvatarImage
                                    src={temoignage.img}
                                    className="object-cover h-10 w-10"
                                  />
                                  <AvatarFallback>
                                    {temoignage.utilisateur.charAt(1)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col leading-4 text-slate-300 font-bold">
                                  <h3>{temoignage.utilisateur}</h3>
                                  <p>{temoignage.role}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div className="p-6 flex flex-col">
          <div className="flex items-center gap-2">
            <SiGoogletagmanager className="text-3xl text-blue-900" />
            <h1 className="text-3xl font-bold">
              Horizon<span className="text-blue-900">Work</span>
            </h1>
          </div>
          <div className="w-full h-full flex justify-center flex-1">
            <Card className="w-[400px] h-full">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              quia vitae adipisci temporibus ut nihil non illum vel voluptate
              esse, distinctio sed impedit, ex, itaque omnis porro molestiae
              totam debitis?
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
 */
