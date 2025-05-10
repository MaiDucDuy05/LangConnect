import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function KnowledgePageLoading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-1/3 mx-auto mb-2" />
          <Skeleton className="h-5 w-1/2 mx-auto" />
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>

        <div className="mb-10">
          <Skeleton className="h-10 w-full mb-6" />

          <div className="mb-10">
            <Skeleton className="aspect-[21/9] w-full rounded-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <Skeleton className="aspect-[16/9] w-full" />
                  <CardContent className="p-5">
                    <Skeleton className="h-5 w-20 mb-2" />
                    <Skeleton className="h-7 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 py-4 border-t">
                    <div className="flex items-center justify-between w-full">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>

          <div className="flex justify-center mt-10">
            <div className="flex items-center space-x-2">
              {Array(7)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10" />
                ))}
            </div>
          </div>
        </div>

        <Skeleton className="h-40 w-full rounded-xl mt-12" />
      </div>
    </div>
  )
}

