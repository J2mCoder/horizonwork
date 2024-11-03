import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userAtom } from "@/contexts/UseUser"
import { SiGoogletagmanager } from "react-icons/si"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { NavItems } from "./NavItems"

export default function Slidebar() {
  const user = useRecoilValue(userAtom)

  return (
    <div>
      <aside className="hidden w-72 border-r lg:block bg-white">
        <div className="flex flex-col w-72 fixed top-0 h-full bg-white left-0">
          <div className="flex items-center px-6 w-full border-dashed h-14 border-b border-customDark/30 pb-2 shadow-sm">
            <SiGoogletagmanager className="text-customDark text-2xl mr-1" />
            <h1 className=" font-bold text-slate-800 text-2xl">
              Horizon<span className="text-customDark">Work</span>
            </h1>
          </div>
          <div className="flex-1  py-5 px-3 space-y-2">
            <NavItems />
          </div>
          <div className="flex items-center py-14 px-3 border-dashed h-14 border-t border-customDark/30 relative">
            <Link to="/profile" className="absolute inset-0"></Link>
            <Avatar className="mr-3 size-10">
              <AvatarImage
                src={`http://localhost:8000/${user?.avatar}`}
                alt={user?.username}
              />
              <AvatarFallback>{`${user?.firstname.charAt(
                0
              )}${user?.lastname.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="w-full break-words">
              <p className="text-sm font-semibold text-customDark">
                {user?.firstname + " " + user?.lastname}
              </p>
              <p className="text-xs text-gray-500 font-semibold line-clamp-1">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
