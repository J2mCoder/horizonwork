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
