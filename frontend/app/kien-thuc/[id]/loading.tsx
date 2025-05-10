import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Article Header */}
            <Skeleton className="w-full h-[300px] md:h-[400px]" />

            <div className="p-6 md:p-8">
              {/* Category & Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="h-10 w-full mb-4" />

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>

              {/* Author */}
              <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              {/* Article Content */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Author Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="h-24 w-24 rounded-full mb-4" />
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-24 h-24 rounded-md flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

