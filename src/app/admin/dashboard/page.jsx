'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { BarChart, Car, CreditCard, DollarSign, Users } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useEffect, useState } from "react"



function formatRelativeTime(timestamp) {
  const now = Date.now()
  const diffMs = now - timestamp;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  return `${Math.floor(diffDays / 7)} weeks ago`;
}

export default function AdminDashboardPage() {
  const data = useQuery(api.booking.fetchBookings)        
  const cars = useQuery(api.cars.fetchCars)  
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
  
  if (data == undefined || users == null || cars == null ) return null
  const joinedData = data.map(booking => {
      const user = users.find(u => u.id === booking.userId);
      return {
        ...booking,
        username:user.firstName,
        userImg:user.imageUrl
      };
  });
  
  const totalRevenue = joinedData.reduce((sum, booking) => {
    return sum + (booking.car?.price || 0);
  }, 0);

  const now = new Date();

  const activeBookings = joinedData.filter(booking => {
    return new Date(booking.endDate) >= now;
  });

  const bookingsWithRelativeTime = joinedData.map(booking => ({
    ...booking,
    createdAtRelative: formatRelativeTime(booking._creationTime)
}));

  const activeCount = activeBookings.length;
  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin! Here's an overview of your rental business.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {totalRevenue}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cars.length}</div>
              <p className="text-xs text-muted-foreground">+2 new cars this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">+201 since last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <RevenueChart/>
                <span className="ml-2 text-muted-foreground">Revenue chart will appear here</span>
              </div>
            </CardContent>
          </Card> */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest car rental bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {bookingsWithRelativeTime.map((d) => (
                  <div key={d._id} className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{d.username} booked a car</p>
                      <p className="text-sm text-muted-foreground">
                        {d.createdAtRelative}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+Kes {d.car.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

