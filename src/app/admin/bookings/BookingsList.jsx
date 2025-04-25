'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, Ellipsis, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for bookings
const bookings = [
  {
    id: "BK001",
    user: "John Doe",
    car: "Tesla Model 3",
    startDate: "2023-10-15",
    endDate: "2023-10-20",
    status: "Active",
    total: 750,
  },
  {
    id: "BK002",
    user: "Jane Smith",
    car: "BMW X5",
    startDate: "2023-10-18",
    endDate: "2023-10-25",
    status: "Upcoming",
    total: 1400,
  },
  {
    id: "BK003",
    user: "Robert Johnson",
    car: "Mercedes C-Class",
    startDate: "2023-10-10",
    endDate: "2023-10-14",
    status: "Completed",
    total: 720,
  },
  {
    id: "BK004",
    user: "Emily Davis",
    car: "Range Rover Sport",
    startDate: "2023-10-22",
    endDate: "2023-10-29",
    status: "Upcoming",
    total: 1750,
  },
  {
    id: "BK005",
    user: "Michael Wilson",
    car: "Toyota Camry",
    startDate: "2023-10-05",
    endDate: "2023-10-12",
    status: "Completed",
    total: 840,
  },
]


const BookingsList = () => {    
  const data = useQuery(api.booking.fetchBookings)    
  const mutateBookingStatus = useMutation(api.booking.updateBooking)
  const [users,setUsers] = useState(null)
    
  useEffect(() => {
    const fetchUsers = async () => {
      await fetch('/api/users')
      .then((res) => res.json())
      .then(data => {        
        setUsers(data.data)
      })
      
    }
    fetchUsers()
  },[])

  if (data == undefined || users == null ) return null
  const joinedData = data.map(booking => {
      const user = users.find(u => u.id === booking.userId);
      return {
        ...booking,
        username:user.firstName,
        userImg:user.imageUrl
      };
  });
  console.log(joinedData);
  return (

    <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>You have {bookings.length} total bookings.</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search bookings..." className="w-full" />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {joinedData.map((booking) => (
                    <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage src={booking.userImg} />
                        <AvatarFallback>{booking.username[0]}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{booking.username}</TableCell>
                    <TableCell>{booking.car.name}</TableCell>
                    <TableCell>{booking.startDate}</TableCell>
                    <TableCell>{booking.endDate}</TableCell>
                    <TableCell>
                        <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            booking.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Upcoming"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                        >
                        {booking.status}
                        </span>
                    </TableCell>
                    <TableCell>KES {booking.car.price}/day</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">                        
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="outline" size="sm">
                              <Ellipsis/>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent> 
                            <DropdownMenuItem onClick={() => mutateBookingStatus({id:booking._id,status:'approved'})}> <Check/> Approved</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => mutateBookingStatus({id:booking._id,status:'denied'})}> <X/> Denied</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => mutateBookingStatus({id:booking._id,status:'pending'})}> <Clock/> Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => mutateBookingStatus({id:booking._id,status:'cancelled'})}> <X/> Cancelled</DropdownMenuItem>                            
                          </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
  )
}

export default BookingsList