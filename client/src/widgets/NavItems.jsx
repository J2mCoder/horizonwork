import {
  BarChart,
  Calendar,
  FileText,
  History,
  Home,
  ListTodo,
  Users,
} from "lucide-react"
import { PiUsersThreeBold } from "react-icons/pi"
import { Link } from "react-router-dom"

export const NavItems = () => (
  <>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      to={""}>
      <Home className="size-5 font-semibold" />
      <span>Accueil</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      to={"project"}>
      <BarChart className="size-5 font-semibold" />
      <span>Projets</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <ListTodo className="size-5 font-semibold" />
      <span>Tâches</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <Users className="size-5 font-semibold" />
      <span>Mon équipe</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      to={"members"}>
      <PiUsersThreeBold className="size-5 font-semibold" />
      <span>Membres</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <Calendar className="size-5 font-semibold" />
      <span>Calendrier</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <FileText className="size-5 font-semibold" />
      <span>Rapports</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <History className="size-5 font-semibold" />
      <span>Historique</span>
    </Link>
  </>
)
