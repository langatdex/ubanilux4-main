'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"


// Mock data for bookings
const activeBookings = [
  {
    id: "BK001",
    car: "Tesla Model 3",
    startDate: "2023-10-15",
    endDate: "2023-10-20",
    status: "Active",
    total: 750,
    image: "/placeholder.svg?height=80&width=120",
  },
]

const upcomingBookings = [
  {
    id: "BK002",
    car: "BMW X5",
    startDate: "2023-10-18",
    endDate: "2023-10-25",
    status: "Upcoming",
    total: 1400,
    image: "/placeholder.svg?height=80&width=120",
  },
]

const pastBookings = [
  {
    id: "BK003",
    car: "Mercedes C-Class",
    startDate: "2023-10-10",
    endDate: "2023-10-14",
    status: "Completed",
    total: 720,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "BK004",
    car: "Toyota Camry",
    startDate: "2023-09-05",
    endDate: "2023-09-12",
    status: "Completed",
    total: 840,
    image: "/placeholder.svg?height=80&width=120",
  },
]
const BookingsList = ({userId}) => {    
    const data = useQuery(api.booking.fetchBookingUserId,{userId})

    console.log(data);

    if (data == undefined) return null

    const today = new Date();

    const upcoming = data.filter(item => new Date(item.startDate) >= today);
    const past = data.filter(item => new Date(item.startDate) < today);    
    
  return (
    <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Bookings</CardTitle>
                <CardDescription>Cars you are currently renting.</CardDescription>
              </CardHeader>
              <CardContent>
                {data.length > 0 ? (
                  <div className="space-y-4">
                    {data.map((booking) => (
                      <div key={booking._id} className="flex items-center gap-4 rounded-lg border p-4">
                        <img
                          src={booking.car.image || "/placeholder.svg"}
                          alt={booking.car.name}
                          width={120}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold">{booking.car.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} to {booking.endDate}
                          </p>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Kes {booking.car.price}</p>
                          <Button variant="outline" size="sm" className="mt-2" asChild>
                            <Link href={`/user/bookings/${booking._id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <h3 className="text-lg font-semibold">No active bookings</h3>
                    <p className="text-sm text-muted-foreground">You don't have any active car rentals.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/user/cars">Browse Cars</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled car rentals.</CardDescription>
              </CardHeader>
              <CardContent>
                {upcoming.length > 0 ? (
                  <div className="space-y-4">
                    {upcoming.map((booking) => (
                      <div key={booking._id} className="flex items-center gap-4 rounded-lg border p-4">
                      <img
                        src={booking.car.image || "/placeholder.svg"}
                        alt={booking.car.name}
                        width={120}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{booking.car.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.startDate} to {booking.endDate}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Kes {booking.car.price}</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link href={`/user/bookings/${booking._id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <h3 className="text-lg font-semibold">No upcoming bookings</h3>
                    <p className="text-sm text-muted-foreground">You don't have any upcoming car rentals.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/user/cars">Browse Cars</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Past Bookings</CardTitle>
                <CardDescription>Your rental history.</CardDescription>
              </CardHeader>
              <CardContent>
                {past.length > 0 ? (
                  <div className="space-y-4">
                    {past.map((booking) => (
                      <div key={booking._id} className="flex items-center gap-4 rounded-lg border p-4">
                      <img
                        src={booking.car.image || "/placeholder.svg"}
                        alt={booking.car.name}
                        width={120}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{booking.car.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.startDate} to {booking.endDate}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Kes {booking.car.price}</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <Link href={`/user/bookings/${booking._id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <h3 className="text-lg font-semibold">No past bookings</h3>
                    <p className="text-sm text-muted-foreground">You don't have any past car rentals.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/user/cars">Browse Cars</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
  )
}

export default BookingsList