
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Input } from "@/components/ui/input"
import BookingsList from './BookingsList'
import { Search } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { getAllUsers } from "@/lib/users"


const AdminBookingsPage = async () => {
  const data = await getAllUsers()
  if (data == undefined) return null
  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            <p className="text-muted-foreground">Manage all car rental bookings and reservations.</p>
          </div>
        </div>
        <BookingsList/>
        
      </div>
    </DashboardLayout>
  )
}

export default AdminBookingsPage