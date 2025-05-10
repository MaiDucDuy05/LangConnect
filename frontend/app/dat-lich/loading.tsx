import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function LoadingAppointment() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-3 w-16 mt-1" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-1 w-full mt-2" />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-24 w-full rounded-md" />
                  <Skeleton className="h-24 w-full rounded-md" />
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-1/4" />
                <div className="space-y-2">
                  <Skeleton className="h-16 w-full rounded-md" />
                  <Skeleton className="h-16 w-full rounded-md" />
                  <Skeleton className="h-16 w-full rounded-md" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

