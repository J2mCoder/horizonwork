import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Header from "@/widgets/Header"
import Slidebar from "@/widgets/Slidebar"
import axios from "axios"
import { BarChart, Clock, ListTodo, Users } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Dashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const logOut = (e) => {
    e.preventDefault()
    axios
      .get("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data?.success === true) {
          toast.success(res.data?.message)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      })
      .catch((err) => {
        toast.warning("Une erreur est survenue")
        console.log(err)
      })
  }

  return (
    <div className="h-screen overflow-hidden flex">
      {/* Sidebar for larger screens */}
      <Slidebar />
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        {/* Dashboard content */}
        <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Project Dashboard</h1>
            <Button>New Project</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <ListTodo className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  2 completed this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Tasks
                </CardTitle>
                <Clock className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground">
                  12 due this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  2 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Project Progress
                </CardTitle>
                <BarChart className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <Progress value={68} className="mt-2" />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: "Alice",
                      action: "completed task",
                      project: "Website Redesign",
                    },
                    {
                      user: "Bob",
                      action: "added new task",
                      project: "Mobile App",
                    },
                    {
                      user: "Charlie",
                      action: "commented on",
                      project: "Database Migration",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="size-9">
                        <AvatarImage
                          src={`/placeholder-user.jpg`}
                          alt={activity.user}
                        />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action} on {activity.project}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Projects</CardTitle>
                <CardDescription>4 of 12 projects in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Website Redesign", progress: 75 },
                    { name: "Mobile App", progress: 40 },
                    { name: "Database Migration", progress: 60 },
                    { name: "API Integration", progress: 25 },
                  ].map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {project.progress}%
                        </div>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
