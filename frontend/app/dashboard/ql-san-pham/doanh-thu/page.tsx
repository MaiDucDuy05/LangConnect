"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dữ liệu mẫu cho biểu đồ
const monthlyData = [
  { name: "T1", doanhThu: 2100000 },
  { name: "T2", doanhThu: 2400000 },
  { name: "T3", doanhThu: 1800000 },
  { name: "T4", doanhThu: 2800000 },
  { name: "T5", doanhThu: 3100000 },
  { name: "T6", doanhThu: 2700000 },
  { name: "T7", doanhThu: 3600000 },
  { name: "T8", doanhThu: 3900000 },
  { name: "T9", doanhThu: 4200000 },
  { name: "T10", doanhThu: 4500000 },
  { name: "T11", doanhThu: 4100000 },
  { name: "T12", doanhThu: 4800000 },
]

const productData = [
  { name: "Trà Thảo Mộc Thanh Nhiệt", doanhThu: 980000 },
  { name: "Cao Gừng Trị Đau Nhức", doanhThu: 850000 },
  { name: "Viên Uống Bổ Gan", doanhThu: 720000 },
  { name: "Tinh Dầu Tràm Trà", doanhThu: 680000 },
  { name: "Thuốc Ngâm Rượu", doanhThu: 650000 },
  { name: "Trà Gừng Mật Ong", doanhThu: 580000 },
  { name: "Cao Dán Giảm Đau", doanhThu: 520000 },
  { name: "Viên Uống Tăng Cường Miễn Dịch", doanhThu: 480000 },
  { name: "Dầu Xoa Bóp", doanhThu: 420000 },
  { name: "Trà Atiso", doanhThu: 380000 },
]

const dailyData = [
  { name: "01", doanhThu: 120000 },
  { name: "02", doanhThu: 140000 },
  { name: "03", doanhThu: 130000 },
  { name: "04", doanhThu: 170000 },
  { name: "05", doanhThu: 150000 },
  { name: "06", doanhThu: 110000 },
  { name: "07", doanhThu: 100000 },
  { name: "08", doanhThu: 160000 },
  { name: "09", doanhThu: 180000 },
  { name: "10", doanhThu: 190000 },
  { name: "11", doanhThu: 170000 },
  { name: "12", doanhThu: 150000 },
  { name: "13", doanhThu: 140000 },
  { name: "14", doanhThu: 130000 },
  { name: "15", doanhThu: 160000 },
  { name: "16", doanhThu: 180000 },
  { name: "17", doanhThu: 200000 },
  { name: "18", doanhThu: 190000 },
  { name: "19", doanhThu: 170000 },
  { name: "20", doanhThu: 150000 },
  { name: "21", doanhThu: 140000 },
  { name: "22", doanhThu: 160000 },
  { name: "23", doanhThu: 180000 },
  { name: "24", doanhThu: 170000 },
  { name: "25", doanhThu: 150000 },
  { name: "26", doanhThu: 140000 },
  { name: "27", doanhThu: 130000 },
  { name: "28", doanhThu: 150000 },
  { name: "29", doanhThu: 160000 },
  { name: "30", doanhThu: 170000 },
]

const categoryData = [
  { name: "Thảo Dược", value: 35 },
  { name: "Thuốc Nam", value: 25 },
  { name: "Thực Phẩm Chức Năng", value: 20 },
  { name: "Dầu Xoa Bóp", value: 15 },
  { name: "Khác", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Chi tiết thống kê
const revenueStats = {
  current: {
    month: "Tháng 10/2023",
    total: 4500000,
    change: 14.2,
    positive: true,
    details: [
      { label: "Tuần 1", value: 1200000 },
      { label: "Tuần 2", value: 980000 },
      { label: "Tuần 3", value: 1150000 },
      { label: "Tuần 4", value: 1170000 },
    ],
  },
  previous: {
    month: "Tháng 9/2023",
    total: 3940000,
  },
}

const orderStats = {
  current: {
    month: "Tháng 10/2023",
    total: 156,
    change: 8.1,
    positive: true,
    details: [
      { label: "Đã hoàn thành", value: 144 },
      { label: "Đang xử lý", value: 8 },
      { label: "Đã hủy", value: 4 },
    ],
  },
  previous: {
    month: "Tháng 9/2023",
    total: 144,
  },
}

const avgOrderStats = {
  current: {
    month: "Tháng 10/2023",
    total: 285000,
    change: 5.3,
    positive: true,
    details: [
      { label: "Cao nhất", value: 1200000 },
      { label: "Thấp nhất", value: 50000 },
      { label: "Phổ biến", value: 250000 },
    ],
  },
  previous: {
    month: "Tháng 9/2023",
    total: 270000,
  },
}

const completionStats = {
  current: {
    month: "Tháng 10/2023",
    total: 92.4,
    change: 1.8,
    positive: false,
    details: [
      { label: "Đúng hẹn", value: "88%" },
      { label: "Trễ hẹn", value: "4.4%" },
      { label: "Hủy", value: "7.6%" },
    ],
  },
  previous: {
    month: "Tháng 9/2023",
    total: 94.2,
  },
}

// Format số tiền
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function DoanhThuPage() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedMonth, setSelectedMonth] = useState("10")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCardExpand = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null)
    } else {
      setExpandedCard(cardId)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doanh Thu</h1>
          <p className="text-gray-500">Thống kê doanh thu từ bán sản phẩm</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tháng" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  Tháng {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Doanh Thu Tháng */}
        <Card
          className={`${expandedCard === "revenue" ? "md:col-span-2 lg:col-span-4 transition-all duration-300" : ""}`}
          onClick={() => toggleCardExpand("revenue")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Doanh Thu Tháng</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueStats.current.total).replace("₫", "")}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p
                className={`text-sm ${revenueStats.current.positive ? "text-green-600" : "text-red-600"} flex items-center`}
              >
                {revenueStats.current.positive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span>
                  {revenueStats.current.positive ? "+" : "-"}
                  {revenueStats.current.change}% so với tháng trước
                </span>
              </p>
            </div>

            {expandedCard === "revenue" && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-4">Chi tiết doanh thu {revenueStats.current.month}</h4>
                <div className="space-y-4">
                  {revenueStats.current.details.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="font-medium">{formatCurrency(item.value).replace("₫", "")}</span>
                    </div>
                  ))}
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueStats.current.details.map((d) => ({ name: d.label, value: d.value }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Đơn Hàng Tháng */}
        <Card
          className={`${expandedCard === "orders" ? "md:col-span-2 lg:col-span-4 transition-all duration-300" : ""}`}
          onClick={() => toggleCardExpand("orders")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đơn Hàng Tháng</p>
                <p className="text-2xl font-bold">{orderStats.current.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p
                className={`text-sm ${orderStats.current.positive ? "text-green-600" : "text-red-600"} flex items-center`}
              >
                {orderStats.current.positive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span>
                  {orderStats.current.positive ? "+" : "-"}
                  {orderStats.current.change}% so với tháng trước
                </span>
              </p>
            </div>

            {expandedCard === "orders" && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-4">Chi tiết đơn hàng {orderStats.current.month}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {orderStats.current.details.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={orderStats.current.details}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {orderStats.current.details.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => value} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Giá Trị Trung Bình */}
        <Card
          className={`${expandedCard === "average" ? "md:col-span-2 lg:col-span-4 transition-all duration-300" : ""}`}
          onClick={() => toggleCardExpand("average")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Giá Trị Trung Bình</p>
                <p className="text-2xl font-bold">{formatCurrency(avgOrderStats.current.total).replace("₫", "")}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p
                className={`text-sm ${avgOrderStats.current.positive ? "text-green-600" : "text-red-600"} flex items-center`}
              >
                {avgOrderStats.current.positive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span>
                  {avgOrderStats.current.positive ? "+" : "-"}
                  {avgOrderStats.current.change}% so với tháng trước
                </span>
              </p>
            </div>

            {expandedCard === "average" && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-4">Chi tiết giá trị đơn hàng {avgOrderStats.current.month}</h4>
                <div className="space-y-4">
                  {avgOrderStats.current.details.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="font-medium">{formatCurrency(item.value).replace("₫", "")}</span>
                    </div>
                  ))}
                  <div className="h-[200px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={avgOrderStats.current.details.map((d) => ({ name: d.label, value: d.value }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Bar dataKey="value" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tỷ Lệ Hoàn Thành */}
        <Card
          className={`${expandedCard === "completion" ? "md:col-span-2 lg:col-span-4 transition-all duration-300" : ""}`}
          onClick={() => toggleCardExpand("completion")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tỷ Lệ Hoàn Thành</p>
                <p className="text-2xl font-bold">{completionStats.current.total}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <p
                className={`text-sm ${completionStats.current.positive ? "text-green-600" : "text-red-600"} flex items-center`}
              >
                {completionStats.current.positive ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span>
                  {completionStats.current.positive ? "+" : "-"}
                  {completionStats.current.change}% so với tháng trước
                </span>
              </p>
            </div>

            {expandedCard === "completion" && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-4">Chi tiết tỷ lệ hoàn thành {completionStats.current.month}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {completionStats.current.details.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={completionStats.current.details.map((d) => ({
                            name: d.label,
                            value: Number.parseFloat(d.value.replace("%", "")),
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {completionStats.current.details.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="products">Theo Sản Phẩm</TabsTrigger>
            <TabsTrigger value="time">Theo Thời Gian</TabsTrigger>
            <TabsTrigger value="category">Theo Danh Mục</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Tổng Quan Doanh Thu</CardTitle>
                <CardDescription>Biểu đồ doanh thu theo tháng trong năm {selectedYear}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Bar dataKey="doanhThu" name="Doanh Thu" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Doanh Thu Theo Sản Phẩm</CardTitle>
                <CardDescription>Top 10 sản phẩm có doanh thu cao nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={productData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 100,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Bar dataKey="doanhThu" name="Doanh Thu" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time">
            <Card>
              <CardHeader>
                <CardTitle>Doanh Thu Theo Thời Gian</CardTitle>
                <CardDescription>
                  Phân tích doanh thu theo ngày trong tháng {selectedMonth}/{selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Line type="monotone" dataKey="doanhThu" name="Doanh Thu" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="category">
            <Card>
              <CardHeader>
                <CardTitle>Doanh Thu Theo Danh Mục</CardTitle>
                <CardDescription>Phân bổ doanh thu theo danh mục sản phẩm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium mb-2">Chi tiết theo danh mục</h4>
                    {categoryData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <div className="flex-1 flex justify-between">
                          <span className="text-sm">{item.name}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="font-medium mb-2">Tổng doanh thu theo danh mục</h4>
                      <div className="space-y-2">
                        {categoryData.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm">{item.name}</span>
                            <span className="font-medium">
                              {formatCurrency((revenueStats.current.total * item.value) / 100)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
