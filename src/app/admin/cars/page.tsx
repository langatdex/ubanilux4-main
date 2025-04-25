'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useState } from "react"


export default function AdminCarsPage() {    
  const [query,setQuery] = useState("")
  const cars = useQuery(api.cars.fetchCars)  
  if (cars == undefined) return null
  const filteredData = cars.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))  
  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
            <p className="text-muted-foreground">Manage your car inventory, add new vehicles, and update details.</p>
          </div>
          <Button asChild>
            <Link href="/admin/cars/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Car
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Car Inventory</CardTitle>
            <CardDescription>You have {cars.length} cars in your inventory.</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search cars..." className="w-full" />
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
                  <TableHead>Image</TableHead>                  
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price/Day</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((car) => (
                  <TableRow key={car._id}>
                    <TableCell>
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        width={80}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </TableCell>                    
                    <TableCell>{car.name}</TableCell>
                    <TableCell>{car.category}</TableCell>
                    <TableCell>${car.price}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          car.status === "available"
                            ? "bg-green-100 text-green-800"
                            : car.status === "rented"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/cars/edit/${car._id}`}>Edit</Link>
                        </Button>                        
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

