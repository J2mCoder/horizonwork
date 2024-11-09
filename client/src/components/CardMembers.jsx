import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export default function CardMembers({ members }) {
  return (
    <>
      {members?.map((member) => (
        <Card
          key={`${member.id}-${member.firstname}-${member.lastname}`}
          className="w-full max-w-sm mx-auto md:mx-0 h-[310px] bg-customLight overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 bg-white">
                <AvatarImage
                  src={"http://localhost:8000/" + member.avatar}
                  alt="placeholder"
                />
                <AvatarFallback className="text-customDark font-bold bg-white border-4 border-customDark">
                  {member.firstname.charAt(0) + member.lastname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xs whitespace-nowrap line-clamp-1 sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-customDark">
                  {member.firstname + " " + member.lastname}
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

            <Card className="flex justify-between items-center p-2">
              <div className="text-center flex-1 border-r border-gray-200">
                <p className="text-xl font-bold">12</p>
                <p className="text-sm text-gray-600">Projects</p>
              </div>
              <div className="text-center flex-1 border-r border-gray-200">
                <p className="text-xl font-bold">22</p>
                <p className="text-sm text-gray-600">Tâches</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-xl font-bold">33%</p>
                <p className="text-sm text-gray-600">Activité</p>
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
      ))}
    </>
  )
}
