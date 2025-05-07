"use client"

import { useState } from "react"
import {
  BarChart,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  FileText,
  Home,
  LineChart,
  Menu,
  PieChart,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { StockChart } from "@/components/stock-chart"
import { NewsCard } from "@/components/news-card"
// import { MarketOverview } from "@/components/market-overview"
import { StockMetrics } from "@/components/stock-metrics"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r border-[#1e293b] bg-[#0f172a] md:flex">
        <div className="flex h-16 items-center border-b border-[#1e293b] px-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="font-bold">FinanceHub</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto px-3 py-4">
          <div className="mb-6 px-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Cari emiten..."
                className="w-full border-[#1e293b] bg-[#1e293b] pl-8 text-slate-300 shadow-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1 px-3 py-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Menu Utama</p>
            <Button
              variant="ghost"
              className="w-full justify-start bg-[#1e293b] text-white hover:bg-[#2d3c52] hover:text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <LineChart className="mr-2 h-4 w-4" />
              Analisis Teknikal
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <BarChart className="mr-2 h-4 w-4" />
              Laporan Keuangan
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <PieChart className="mr-2 h-4 w-4" />
              Portofolio
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Kalender Ekonomi
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <FileText className="mr-2 h-4 w-4" />
              Berita
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <BarChart3 className="mr-2 h-4 w-4" />
              Informasi Keuangan
            </Button>
          </div>
          <div className="mt-6 space-y-1 px-3 py-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Watchlist</p>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <div className="mr-2 flex h-4 w-4 items-center justify-center rounded bg-blue-500 text-[10px] font-bold text-white">
                B
              </div>
              BBCA - Bank BCA
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <div className="mr-2 flex h-4 w-4 items-center justify-center rounded bg-green-500 text-[10px] font-bold text-white">
                T
              </div>
              TLKM - Telkom
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white">
              <div className="mr-2 flex h-4 w-4 items-center justify-center rounded bg-purple-500 text-[10px] font-bold text-white">
                A
              </div>
              ASII - Astra
            </Button>
          </div>
        </div>
        <div className="border-t border-[#1e293b] p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              <Clock className="mr-1 inline-block h-3.5 w-3.5" />
              <span>Update: 15:30 WIB</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#1e293b] bg-[#0f172a]/80 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5 text-slate-400" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-r border-[#1e293b] bg-[#0f172a] p-0">
                <div className="flex h-16 items-center border-b border-[#1e293b] px-6">
                  <Link href="#" className="flex items-center gap-2 text-lg font-semibold text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <span className="font-bold">FinanceHub</span>
                  </Link>
                </div>
                <div className="px-3 py-4">
                  <div className="mb-6 px-3">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        type="search"
                        placeholder="Cari emiten..."
                        className="w-full border-[#1e293b] bg-[#1e293b] pl-8 text-slate-300 shadow-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-indigo-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 px-3 py-2">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Menu Utama</p>
                    <Button
                      variant="ghost"
                      className="w-full justify-start bg-[#1e293b] text-white hover:bg-[#2d3c52] hover:text-white"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white"
                    >
                      <LineChart className="mr-2 h-4 w-4" />
                      Analisis Teknikal
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white"
                    >
                      <BarChart className="mr-2 h-4 w-4" />
                      Laporan Keuangan
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white"
                    >
                      <PieChart className="mr-2 h-4 w-4" />
                      Portofolio
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Kalender Ekonomi
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Berita
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:bg-[#1e293b] hover:text-white"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Informasi Keuangan
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold text-white">Dashboard Saham</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 rounded-full bg-indigo-900/50 px-3 py-1 text-sm text-indigo-300 md:flex">
              <Clock className="h-3.5 w-3.5" />
              <span>Update: 15:30 WIB</span>
            </div>
            <Select defaultValue="1d">
              <SelectTrigger className="w-[120px] border-[#1e293b] bg-[#1e293b] text-slate-300">
                <SelectValue placeholder="Periode" />
              </SelectTrigger>
              <SelectContent className="border-[#1e293b] bg-[#0f172a] text-slate-300">
                <SelectItem value="1d">1 Hari</SelectItem>
                <SelectItem value="1w">1 Minggu</SelectItem>
                <SelectItem value="1m">1 Bulan</SelectItem>
                <SelectItem value="3m">3 Bulan</SelectItem>
                <SelectItem value="1y">1 Tahun</SelectItem>
                <SelectItem value="5y">5 Tahun</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifikasi</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Pengaturan</span>
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {/* <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <MarketOverview darkMode={true} />
          </div> */}

          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="overflow-hidden border-[#1e293b] bg-[#0f172a] shadow-lg lg:col-span-2">
              <CardHeader className="border-b border-[#1e293b] bg-[#0f172a] px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white">BBCA - Bank Central Asia Tbk</CardTitle>
                      <div className="rounded-full bg-indigo-900/50 px-2 py-0.5 text-xs font-medium text-indigo-300">
                        Keuangan
                      </div>
                    </div>
                    <CardDescription className="text-slate-400">IDX: BBCA | Market Cap: Rp 1,200T</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">Rp 9.750</div>
                    <div className="flex items-center justify-end gap-1 text-sm font-medium text-emerald-400">
                      <TrendingUp className="h-4 w-4" />
                      +2.5%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-[#1e293b] px-6 py-4">
                  <StockChart darkMode={true} />
                </div>
                <div className="p-6">
                  <StockMetrics darkMode={true} />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="border-[#1e293b] bg-[#0f172a] shadow-lg">
                <CardHeader className="border-b border-[#1e293b] px-6 pb-3 pt-4">
                  <CardTitle className="text-base text-white">Berita Terkini</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-[#1e293b]">
                    <NewsCard
                      title="BCA Catat Pertumbuhan Laba 7% di Q2 2023"
                      summary="Bank Central Asia (BBCA) mencatatkan pertumbuhan laba bersih sebesar 7% YoY pada kuartal kedua 2023."
                      date="2 jam yang lalu"
                      source="Investor Daily"
                      darkMode={true}
                    />
                    <NewsCard
                      title="OJK Perketat Aturan Margin Trading"
                      summary="Otoritas Jasa Keuangan (OJK) mengeluarkan aturan baru terkait margin trading untuk meningkatkan perlindungan investor."
                      date="5 jam yang lalu"
                      source="CNBC Indonesia"
                      darkMode={true}
                    />
                    <NewsCard
                      title="Ekonom: Pertumbuhan Ekonomi Indonesia Capai 5.2% di Q2"
                      summary="Para ekonom memperkirakan pertumbuhan ekonomi Indonesia mencapai 5.2% pada kuartal kedua 2023, didorong oleh konsumsi domestik."
                      date="8 jam yang lalu"
                      source="Bisnis Indonesia"
                      darkMode={true}
                    />
                  </div>
                  <div className="border-t border-[#1e293b] p-3">
                    <Button variant="ghost" className="w-full justify-between text-sm text-slate-400 hover:text-white">
                      Lihat semua berita
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#1e293b] bg-[#0f172a] shadow-lg">
                <CardHeader className="border-b border-[#1e293b] px-6 pb-3 pt-4">
                  <CardTitle className="text-base text-white">Saham Teratas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-[#1e293b]">
                    <div className="flex items-center justify-between px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-900/50 text-blue-300">
                          <span className="text-xs font-bold">BBRI</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">Bank BRI</div>
                          <div className="text-xs text-slate-400">Keuangan</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">Rp 5.250</div>
                        <div className="text-xs text-emerald-400">+1.8%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-900/50 text-green-300">
                          <span className="text-xs font-bold">TLKM</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">Telkom Indonesia</div>
                          <div className="text-xs text-slate-400">Telekomunikasi</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">Rp 3.850</div>
                        <div className="text-xs text-emerald-400">+2.1%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-900/50 text-purple-300">
                          <span className="text-xs font-bold">ASII</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">Astra International</div>
                          <div className="text-xs text-slate-400">Otomotif</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">Rp 4.750</div>
                        <div className="text-xs text-red-400">-0.5%</div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[#1e293b] p-3">
                    <Button variant="ghost" className="w-full justify-between text-sm text-slate-400 hover:text-white">
                      Lihat semua saham
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="border-[#1e293b] bg-[#0f172a] shadow-lg">
            <CardHeader className="border-b border-[#1e293b] px-6 pb-3 pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Informasi Keuangan</CardTitle>
                <Select defaultValue="q2_2023">
                  <SelectTrigger className="h-8 w-[150px] border-[#1e293b] bg-[#1e293b] text-slate-300">
                    <SelectValue placeholder="Pilih Periode" />
                  </SelectTrigger>
                  <SelectContent className="border-[#1e293b] bg-[#0f172a] text-slate-300">
                    <SelectItem value="q2_2023">Q2 2023</SelectItem>
                    <SelectItem value="q1_2023">Q1 2023</SelectItem>
                    <SelectItem value="q4_2022">Q4 2022</SelectItem>
                    <SelectItem value="q3_2022">Q3 2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b border-[#1e293b] px-6">
                  <TabsList className="h-12 w-full justify-start gap-6 bg-transparent p-0">
                    <TabsTrigger
                      value="overview"
                      className="h-12 border-b-2 border-transparent text-slate-400 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      Ikhtisar
                    </TabsTrigger>
                    <TabsTrigger
                      value="income"
                      className="h-12 border-b-2 border-transparent text-slate-400 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      Laba Rugi
                    </TabsTrigger>
                    <TabsTrigger
                      value="balance"
                      className="h-12 border-b-2 border-transparent text-slate-400 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      Neraca
                    </TabsTrigger>
                    <TabsTrigger
                      value="cashflow"
                      className="h-12 border-b-2 border-transparent text-slate-400 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      Arus Kas
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="overview" className="m-0 p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#1e293b] hover:bg-transparent">
                        <TableHead className="w-[250px] bg-[#1e293b] text-slate-300">Metrik</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q2 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q1 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">YoY %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Pendapatan</TableCell>
                        <TableCell className="text-slate-300">Rp 25.7T</TableCell>
                        <TableCell className="text-slate-300">Rp 24.2T</TableCell>
                        <TableCell className="text-emerald-400">+6.2%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Laba Kotor</TableCell>
                        <TableCell className="text-slate-300">Rp 18.3T</TableCell>
                        <TableCell className="text-slate-300">Rp 17.1T</TableCell>
                        <TableCell className="text-emerald-400">+7.0%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Laba Bersih</TableCell>
                        <TableCell className="text-slate-300">Rp 10.5T</TableCell>
                        <TableCell className="text-slate-300">Rp 9.8T</TableCell>
                        <TableCell className="text-emerald-400">+7.1%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">EPS</TableCell>
                        <TableCell className="text-slate-300">Rp 425</TableCell>
                        <TableCell className="text-slate-300">Rp 398</TableCell>
                        <TableCell className="text-emerald-400">+6.8%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">ROE</TableCell>
                        <TableCell className="text-slate-300">19.8%</TableCell>
                        <TableCell className="text-slate-300">19.2%</TableCell>
                        <TableCell className="text-emerald-400">+0.6%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="income" className="m-0 p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#1e293b] hover:bg-transparent">
                        <TableHead className="w-[250px] bg-[#1e293b] text-slate-300">Metrik</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q2 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q1 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">YoY %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Pendapatan Bunga</TableCell>
                        <TableCell className="text-slate-300">Rp 18.2T</TableCell>
                        <TableCell className="text-slate-300">Rp 17.5T</TableCell>
                        <TableCell className="text-emerald-400">+4.0%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Pendapatan Non-Bunga</TableCell>
                        <TableCell className="text-slate-300">Rp 7.5T</TableCell>
                        <TableCell className="text-slate-300">Rp 6.7T</TableCell>
                        <TableCell className="text-emerald-400">+11.9%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Beban Operasional</TableCell>
                        <TableCell className="text-slate-300">Rp 9.8T</TableCell>
                        <TableCell className="text-slate-300">Rp 9.5T</TableCell>
                        <TableCell className="text-red-400">+3.2%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Laba Sebelum Pajak</TableCell>
                        <TableCell className="text-slate-300">Rp 13.2T</TableCell>
                        <TableCell className="text-slate-300">Rp 12.3T</TableCell>
                        <TableCell className="text-emerald-400">+7.3%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="balance" className="m-0 p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#1e293b] hover:bg-transparent">
                        <TableHead className="w-[250px] bg-[#1e293b] text-slate-300">Metrik</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q2 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q1 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">YoY %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Total Aset</TableCell>
                        <TableCell className="text-slate-300">Rp 1,350T</TableCell>
                        <TableCell className="text-slate-300">Rp 1,320T</TableCell>
                        <TableCell className="text-emerald-400">+2.3%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Kredit</TableCell>
                        <TableCell className="text-slate-300">Rp 720T</TableCell>
                        <TableCell className="text-slate-300">Rp 705T</TableCell>
                        <TableCell className="text-emerald-400">+2.1%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Dana Pihak Ketiga</TableCell>
                        <TableCell className="text-slate-300">Rp 980T</TableCell>
                        <TableCell className="text-slate-300">Rp 965T</TableCell>
                        <TableCell className="text-emerald-400">+1.6%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Ekuitas</TableCell>
                        <TableCell className="text-slate-300">Rp 215T</TableCell>
                        <TableCell className="text-slate-300">Rp 208T</TableCell>
                        <TableCell className="text-emerald-400">+3.4%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="cashflow" className="m-0 p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#1e293b] hover:bg-transparent">
                        <TableHead className="w-[250px] bg-[#1e293b] text-slate-300">Metrik</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q2 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">Q1 2023</TableHead>
                        <TableHead className="bg-[#1e293b] text-slate-300">YoY %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Arus Kas Operasi</TableCell>
                        <TableCell className="text-slate-300">Rp 15.2T</TableCell>
                        <TableCell className="text-slate-300">Rp 14.3T</TableCell>
                        <TableCell className="text-emerald-400">+6.3%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Arus Kas Investasi</TableCell>
                        <TableCell className="text-slate-300">Rp -5.8T</TableCell>
                        <TableCell className="text-slate-300">Rp -4.9T</TableCell>
                        <TableCell className="text-red-400">+18.4%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Arus Kas Pendanaan</TableCell>
                        <TableCell className="text-slate-300">Rp -3.2T</TableCell>
                        <TableCell className="text-slate-300">Rp -2.8T</TableCell>
                        <TableCell className="text-red-400">+14.3%</TableCell>
                      </TableRow>
                      <TableRow className="border-[#1e293b] hover:bg-[#1e293b]/50">
                        <TableCell className="font-medium text-white">Kas Bersih</TableCell>
                        <TableCell className="text-slate-300">Rp 6.2T</TableCell>
                        <TableCell className="text-slate-300">Rp 6.6T</TableCell>
                        <TableCell className="text-red-400">-6.1%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
