import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Activity,
  Filter,
  Search,
  Star,
  UserCheck,
  Users,
  UserX,
} from "lucide-react"
import { useState } from "react"

export default function Member() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeOnly, setActiveOnly] = useState(false)
  const [view, setView] = useState("grid")

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesActive = !activeOnly || member.status === "Disponible"
    return matchesSearch && matchesActive
  })

  const projectOptions = [1, 2, 3, 4, 5, 10, "+15"]
  const tacheOptions = [2, 5, 10, "+15"]
  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-background px-5 py-2">
        <h1 className="font-bold text-2xl md:text-4xl text-customDark">
          Recrutement de Membres
        </h1>
        <p className="font-bold text-sm md:text-lg text-customDark/80">
          Trouvez des membres pour votre équipe
        </p>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-customDark">
            Engagement des Membres
          </CardTitle>
          <CardDescription className="font-bold text-customDark/80">
            Découvrez les profils les plus engagés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="relative overflow-hidden bg-customLight">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-1">
                    <div className="space-y-2">
                      <p className="text-lg font-bold whitespace-nowrap text-customDark">
                        {stat.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-customDark">
                          {stat.value}
                        </span>
                        <Badge
                          variant={
                            stat.trend === "up" ? "success" : "destructive"
                          }
                          className={`h-5 ${
                            stat.trend === "up" ? "bg-green-300" : ""
                          }`}>
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.iconBg}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-customDark/80 mt-2">
                    {stat.subtext}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-customDark">
            Liste des Membres
          </CardTitle>
          <CardDescription className="font-bold text-customDark/80">
            Recherchez et filtrez les membres par nom ou rôle
          </CardDescription>
          <br />
          <div className="flex items-center justify-center gap-3 bg-customLight border-2 p-4 rounded-lg">
            <div className="flex flex-1 items-center">
              <Input
                type="text"
                placeholder="Rechercher..."
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2 ">
              <div className="hidden xl:flex gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__">Tous les statuts</SelectItem>
                    <SelectItem value="true">Actif</SelectItem>
                    <SelectItem value="false">Inactif</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="projets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__">Tous les projets</SelectItem>
                    {projectOptions.map((v) => (
                      <SelectItem key={v} value={`${v}`}>
                        {v === 1 ? v + " Projet" : v + " Projets"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="tachês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Toutes les tachês</SelectItem>
                    {tacheOptions.map((i, v) => (
                      <SelectItem key={v} value={`${i}`}>
                        {i} tachês
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DropdownMenu className="">
                <DropdownMenuTrigger>
                  <Button className="h-12 xl:hidden block bg-customDark lg:px-7 hover:bg-customDark/90 text-lg">
                    <Filter className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__">Tous les statuts</SelectItem>
                        <SelectItem value="true">Actif</SelectItem>
                        <SelectItem value="false">Inactif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Projets" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__">Tous les projets</SelectItem>
                        {projectOptions.map((v) => (
                          <SelectItem key={v} value={`${v}`}>
                            {v === 1 ? v + " Projet" : v + " Projets"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tâches" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Toutes les tâches</SelectItem>
                        {tacheOptions.map((i) => (
                          <SelectItem key={i} value={`${i}`}>
                            {i} tâches
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="h-12 hidden lg:flex bg-customDark lg:px-7 hover:bg-customDark/90 text-lg">
                Filtrer
              </Button>
              <Button className="h-12 flex lg:hidden bg-customDark lg:px-7 hover:bg-customDark/90 text-lg">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="w-full max-w-sm bg-customLight">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-white">
                  <AvatarImage
                    src={"/placeholder.svg?height=100&width=100"}
                    alt="placeholder"
                  />
                  <AvatarFallback className="text-customDark font-bold bg-white border-4 border-customDark">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-customDark">
                    John Doe
                  </h2>
                  <p className="text-gray-600 text-lg font-semibold">
                    UI Designer
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm font-semibold">
                Berlin-based UI designer Driving business success with Design
                Systems
              </p>

              <Card className="flex justify-between items-center p-2 ">
                <div className="text-center">
                  <p className="text-xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">22</p>
                  <p className="text-sm text-gray-600">Referrals</p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">33</span>
                  </div>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button className="flex-1 bg-customDark font-bold hover:bg-customDark/95">
                  Invité
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white border-2 border-customDark/40 hover:bg-gray-200">
                  voir le profil
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

const stats = [
  {
    label: "Total Membres",
    value: "156",
    change: "+12%",
    trend: "up",
    iconBg: "bg-blue-100",
    icon: <Users className="h-6 w-6 text-blue-600" />,
    subtext: "12 nouveaux membres ce mois",
  },
  {
    label: "Membres Actifs",
    value: "124",
    change: "-26",
    trend: "down",
    iconBg: "bg-green-100",
    icon: <UserCheck className="h-6 w-6 text-green-600" />,
    subtext: "85% des membres actifs ce mois",
  },
  {
    label: "Membres Inactifs",
    value: "32",
    change: "+124",
    trend: "up",
    iconBg: "bg-red-100",
    icon: <UserX className="h-6 w-6 text-red-600" />,
    subtext: "Baisse de 5% ce mois",
  },
  {
    label: "Taux d'Activité",
    value: "78%",
    change: "+15%",
    trend: "up",
    iconBg: "bg-purple-100",
    icon: <Activity className="h-6 w-6 text-purple-600" />,
    subtext: "Hausse constante",
  },
]

const members = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Chef de Projet",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    initials: "SM",
    projectsCount: 5,
    lastActivity: "Il y a 10 min",
    status: "Disponible",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Développeur Senior",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    initials: "TD",
    projectsCount: 3,
    lastActivity: "Il y a 1 heure",
    status: "En réunion",
  },
  {
    id: 3,
    name: "Marie Lambert",
    role: "Designer UI/UX",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    initials: "ML",
    projectsCount: 4,
    lastActivity: "Il y a 30 min",
    status: "En pause déjeuner",
  },
]
