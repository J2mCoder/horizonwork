import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function Project() {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Project Details</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
