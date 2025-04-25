'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { useUser } from "@clerk/nextjs"
import BookingsList from './BookingsList'



export default function UserBookingsPage() {
  const {user} = useUser()
  if (user == undefined) return null
  return (
    <>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-muted-foreground">Manage your car rental bookings and reservations.</p>
          </div>
          <Button asChild>
            <Link href="/cars">Book a Car</Link>
          </Button>
        </div>
        <BookingsList userId={user?.id}/>
      </div>
    </>
  )
}

