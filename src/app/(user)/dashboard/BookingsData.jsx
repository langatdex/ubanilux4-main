'use client'
import React from 'react'
import Link from "next/link"
import { Calendar, Car, CreditCard, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'


function formatRelativeTime(timestamp) {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    return `${Math.floor(diffDays / 7)} weeks ago`;
}

const BookingsData = ({userId}) => {
    const data = useQuery(api.booking.fetchBookingUserId,{userId})
    console.log(data);
    if (data == undefined) return null
    const today = new Date();

    const upcoming = data.filter(item => new Date(item.startDate) >= today);
    const past = data.filter(item => new Date(item.startDate) < today);    

    const bookingsWithRelativeTime = data.map(booking => ({
        ...booking,
        createdAtRelative: formatRelativeTime(booking._creationTime)
    }));
  return (
    <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">You have {upcoming.length} active rental</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">You have {upcoming.length} upcoming booking</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250</div>
              <p className="text-xs text-muted-foreground">Across {data.length} bookings</p>
            </CardContent>
          </Card>
          
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled car rentals</CardDescription>
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
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {booking.status}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/user/bookings/${booking._id}`}>View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">No upcoming bookings</h3>
                  <p className="text-sm text-muted-foreground">You don't have any upcoming car rentals.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/user/cars">Browse Cars</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent car rental activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {bookingsWithRelativeTime.map((d) => (
                    <div key={d._id} className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Car className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">You booked a {d.car.name}</p>
                        <p className="text-sm text-muted-foreground">{d.createdAtRelative}</p>
                    </div>
                    </div>
                ))}
                
                
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}

export default BookingsData