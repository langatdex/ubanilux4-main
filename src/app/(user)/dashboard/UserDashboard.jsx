'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import BookingsData from './BookingsData'
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { updateRole } from "@/lib/users"

export default function UserDashboardPage() {
  // Mock data for upcoming bookings
  const upcomingBookings = [
    {
      id: "BK002",
      car: "BMW X5",
      startDate: "2023-10-18",
      endDate: "2023-10-25",
      status: "Upcoming",
      image: "/placeholder.svg?height=80&width=120",
    },
  ]
  const {user} = useUser()

  useEffect(() => {
    if (user == undefined) return 
    const updateUser = async () => {
      await updateRole({
        user:user?.id,
        role:"user"
      })
    }

    updateUser()
  },[user])

  if (user == undefined) return null

  return (
    <>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.firstName}! Here's an overview of your rental activity.</p>
          </div>
          <Button asChild>
            <Link href="/cars">Rent a Car</Link>
          </Button>
        </div>
        <BookingsData userId={user?.id}/>
      </div>
    </>
  )
}

