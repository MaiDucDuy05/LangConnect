"use client"
import SearchAndFilter from "@/components/search-and-filter"
import type { Clinic, Practitioner } from "@/types"
import { useState } from "react"
import FiltersSidebar from "@/components/filters-sidebar"
import ClinicsList from "@/components/phong-kham/clinics-list"

export default function ClinicsPage() {
  const [filteredClinics, setFilteredClinics] = useState<Clinic[] | Practitioner[]>([])
  const handleFilterChange = (filteredData: Clinic[] | Practitioner[]) => {
    if (Array.isArray(filteredData) && filteredData.every((item) => "phone" in item && "services" in item)) {
      setFilteredClinics(filteredData as unknown as Clinic[])
    }
  }

  // Check if there are no clinics
  const hasNoClinics = filteredClinics.length === 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Phòng Khám Đông Y</h1>

      <SearchAndFilter data={[]} onFilterChange={handleFilterChange} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <FiltersSidebar data={[]} onFilterChange={handleFilterChange} />

        {/* No Clinics Message or Clinics List */}
        {hasNoClinics ? (
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rất tiếc!</h3>
              <p className="text-gray-600 mb-6">
                Trong quá trình thử nghiệm chưa có phòng khám nào được đăng ký trên hệ thống.
              </p>
              <p className="text-gray-500 text-sm">
                Chúng tôi đang trong quá trình phát triển và sẽ sớm cập nhật thêm nhiều phòng khám.
              </p>
            </div>
          </div>
        ) : (
          <ClinicsList clinics={filteredClinics} />
        )}
      </div>
    </div>
  )
}
