import { Skeleton } from "@/components/ui/skeleton"

export default function TaiKhoanLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>

        <div className="md:col-span-2">
          <Skeleton className="h-12 w-full rounded-t-lg" />
          <Skeleton className="h-[500px] w-full rounded-b-lg" />
        </div>
      </div>
    </div>
  )
}

