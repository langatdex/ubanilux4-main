"use client"

import { Bar, BarChart } from "recharts"
 
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",    
  },
} 

const RevenueChart = () => {
  return (
      <div>

        <ChartContainer className="w-full h-full">
        <BarChart data={chartData}>
          <Bar dataKey="value" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
        </ChartContainer>    
      </div>
  )
}

export default RevenueChart