import CardMembers from "@/components/CardMembers"
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
import { LoaderAtom, memberAtom } from "@/contexts/UseUser"
import axios from "axios"
import Cookies from "js-cookie"
import { Activity, Filter, Search, UserCheck, Users, UserX } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useRecoilState } from "recoil"

export default function Member() {
  const [members, setMembers] = useRecoilState(memberAtom)
  const [_, setLoader] = useRecoilState(LoaderAtom)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchProject, setSearchProject] = useState()
  const [searchStatus, setSearchStatus] = useState()
  const [searchTask, setSearchTask] = useState()
  const [filteredMembers, setFilteredMembers] = useState([])

  const memoizedMembers = useMemo(() => members, [members])
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/relation/members", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setMembers(res.data.users)
        setFilteredMembers(res.data.users)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false))
  }, [])

  const handleFilter = () => {
    if (searchQuery) {
      setFilteredMembers(
        memoizedMembers.filter(
          (member) =>
            member.firstname
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            member.lastname.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredMembers(memoizedMembers)
    }
  }

  console.log(filteredMembers)

  /* console.log(
    members,
    memoizedMembers,
    searchQuery,
    searchProject,
    searchStatus,
    searchTask
  ) */

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2 ">
              <div className="hidden xl:flex gap-2">
                <Select
                  onValueChange={(v) => setSearchStatus(v === "__" ? null : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__">Tous les statuts</SelectItem>
                    <SelectItem value="true">Actif</SelectItem>
                    <SelectItem value="false">Inactif</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(v) =>
                    setSearchProject(v === "__" ? null : v)
                  }>
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
                <Select
                  onValueChange={(v) => setSearchTask(v === "__" ? null : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="tachês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__">Toutes les tachês</SelectItem>
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
                  <DropdownMenuLabel>Statut</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Select
                      onValueChange={(v) =>
                        setSearchStatus(v === "__" ? null : v)
                      }>
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
                    <Select
                      onValueChange={(v) =>
                        setSearchProject(v === "__" ? null : v)
                      }>
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
                    <Select
                      onValueChange={(v) =>
                        setSearchTask(v === "__" ? null : v)
                      }>
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
              <Button
                className="h-12 hidden lg:flex bg-customDark lg:px-7 hover:bg-customDark/90 text-lg"
                onClick={handleFilter}>
                Filtrer
              </Button>
              <Button
                className="h-12 flex lg:hidden bg-customDark lg:px-7 hover:bg-customDark/90 text-lg"
                onClick={handleFilter}>
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-between">
          <CardMembers members={filteredMembers} />
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
