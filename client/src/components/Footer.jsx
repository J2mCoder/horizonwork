import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-6 font-semibold text-zinc-700">
      <p className="text-center">
        © {new Date().getFullYear()} Tous droits réservés.{" "}
        <Link to={"/terms"} className="underline hover:text-customDark">
          {"Conditions d'utilisation"}
        </Link>
      </p>
      <p className="text-center">HorizonWork by Horizon Platforms</p>
    </footer>
  )
}
