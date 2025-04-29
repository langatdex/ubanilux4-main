'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Car, Filter, Search } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import Image from "next/image"
import { useState } from "react"

// Default placeholder image
const PLACEHOLDER_IMAGE = "https://placehold.co/400x225/gray/white?text=No+Image"

export default function UserCarsPage() {
  const [query,setQuery] = useState("")
  
  const cars = useQuery(api.cars.fetchCars) 
  console.log(cars); 
  if (cars == undefined) return null  

  const filteredData = cars.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))  
  return (
    <>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between mx-8 ">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Browse Cars</h1>
            <p className="text-muted-foreground">Find and book the perfect car for your needs.</p>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Search</h3>
            <div className="flex items-center space-x-2">
              <Input 
              onChange={(e) => setQuery(e.target.value)}
              type="search" placeholder="Search cars..." className="w-full" />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          
          <div className="flex flex-wrap gap-4 ">
            {filteredData.map((car) => (
              <Card key={car._id} className="overflow-hidden w-[400px] pt-0">
                <div className="aspect-video w-[400px] relative bg-red-900">
                  <Image
                    src={car.image || PLACEHOLDER_IMAGE}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />                  
                  <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
                    Kes {car.price}/day
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{car.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Car className="mr-1 h-4 w-4" />
                      {car.category}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-muted px-2 py-1">{car.seats} Seats</span>
                      <span className="rounded-full bg-muted px-2 py-1">{car.transmission}</span>
                    </div>
                    <div className="flex justify-start pt-2">
                      <Button  size="sm" asChild>
                        <Link href={`/cars/${car._id}`}>Details</Link>
                      </Button>                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

