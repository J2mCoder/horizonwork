import { SiGoogletagmanager } from "react-icons/si"

export default function Loader() {
  return (
    <div className="absolute z-50 flex size-full items-center justify-center bg-customLight">
      <div className="flex items-center gap-3">
        <SiGoogletagmanager className="animate-spin text-3xl text-customDark" />
        <h1 className="text-3xl font-bold text-customDark">Chargement...</h1>
      </div>
    </div>
  )
}
