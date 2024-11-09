import Footer from "@/components/Footer"
import Header from "@/widgets/Header"
import Slidebar from "@/widgets/Slidebar"
import { Outlet } from "react-router-dom"

export default function Home() {
  /*const currentDate = new Date()
  console.log("Date et heure actuelles :", currentDate)
  console.log("Date sous forme de chaîne :", currentDate.toString())
  console.log("Date au format ISO :", currentDate.toISOString())
  console.log("Date uniquement :", currentDate.toLocaleDateString())
  console.log("Heure uniquement :", currentDate.toLocaleTimeString()) */
  return (
    <div className="h-screen flex">
      {/* Sidebar for larger screens */}
      <Slidebar />
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <Header />
        {/* Dashboard content */}
        <main className="flex-1 space-y-6 p-4 md:p-6 mt-14">
          <Outlet />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
