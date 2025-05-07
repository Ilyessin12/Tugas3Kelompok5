"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Data dummy untuk grafik saham
const generateStockData = () => {
  const data = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let price = 8500

  for (let i = 0; i < 12; i++) {
    // Simulasi pergerakan harga dengan random walk
    const change = Math.random() * 500 - 250
    price = Math.max(price + change, 7000)

    data.push({
      name: months[i],
      price: Math.round(price),
      volume: Math.round(Math.random() * 1000000 + 500000),
    })
  }

  return data
}

export function StockChart({ darkMode = false }) {
  const [data, setData] = useState([])
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setData(generateStockData())
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const formatRupiah = (value) => {
    return `Rp ${value.toLocaleString("id-ID")}`
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={darkMode ? "#818cf8" : "#10b981"} stopOpacity={0.3} />
              <stop offset="95%" stopColor={darkMode ? "#818cf8" : "#10b981"} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#e2e8f0"} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: windowWidth < 500 ? 10 : 12, fill: darkMode ? "#94a3b8" : "#64748b" }}
          />
          <YAxis
            tickFormatter={formatRupiah}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: windowWidth < 500 ? 10 : 12, fill: darkMode ? "#94a3b8" : "#64748b" }}
            width={80}
          />
          <Tooltip
            formatter={(value) => [`${formatRupiah(value)}`, "Harga"]}
            labelFormatter={(label) => `Bulan: ${label}`}
            contentStyle={{
              borderRadius: "8px",
              border: darkMode ? "1px solid #1e293b" : "1px solid #e2e8f0",
              backgroundColor: darkMode ? "#0f172a" : "#ffffff",
              color: darkMode ? "#e2e8f0" : "#1e293b",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={darkMode ? "#818cf8" : "#10b981"}
            strokeWidth={2}
            fill="url(#colorPrice)"
            activeDot={{ r: 6, strokeWidth: 0, fill: darkMode ? "#818cf8" : "#10b981" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
