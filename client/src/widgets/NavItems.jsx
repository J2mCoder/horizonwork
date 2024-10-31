import {
  BarChart,
  Calendar,
  FileText,
  Home,
  ListTodo,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

export const NavItems = () => (
  <>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <Home className="size-5 font-semibold" />
      <span>Accueil</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <BarChart className="size-4" />
      <span>Projets</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <ListTodo className="size-4" />
      <span>Tâches</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <Users className="size-4" />
      <span>Équipe</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <Calendar className="size-4" />
      <span>Calendrier</span>
    </Link>
    <Link
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-customDark/80 font-semibold text-xl transition-all hover:bg-gray-100 hover:text-customDark"
      href="#">
      <FileText className="size-4" />
      <span>Rapports</span>
    </Link>
  </>
)
