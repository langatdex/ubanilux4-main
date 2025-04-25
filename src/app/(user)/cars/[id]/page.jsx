"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Car, Check, CreditCard, Fuel, Gauge, Info, Loader, Phone, Settings, Users } from "lucide-react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { useParams } from "next/navigation"
import axios from "axios"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { features } from "process"
import { toast } from "sonner"


export default function CarDetailsPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [phone, setPhone] = useState("")
  const router = useParams()

  const [isLoading,setIsLoading] = useState(false)

  const {user} = useUser()
  
  const car = useQuery(api.cars.fetchCarId,{id:router.id})
  const createBooking = useMutation(api.booking.createBooking)

  if (car == undefined) return null  

  console.log(startDate);
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handlePayment = async () => {
    setIsLoading(true)
    const data = {
      phoneNumber:phone,
      amount:1
    }
    await axios.post("/api/initiate-payment", JSON.parse(JSON.stringify(data)))
    await wait(2500)

    const bookingDetails = {
      userId:user?.id,
      carId:car?._id,
      startDate:startDate,
      endDate:endDate,
      status:'pending',
      paymentStatus:"paid"
    }

    const res = await createBooking(bookingDetails)    
    if (res) toast.success("Successful booking")
    else toast.error("There was an error. Try again later",{description:"Developer check logs"})
    setIsLoading(false)
  }
  return (
    <>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/cars">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{car.name}</h1>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img src={car.image || "/placeholder.svg"} alt={car.name} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {car.images.map((image, index) => (
                <div key={index} className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Kes{car.name} view Kes{index + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4 border rounded-lg mt-2">
                <p>{car.description}</p>
              </TabsContent>
              <TabsContent value="features" className="p-4 border rounded-lg mt-2">
                {features && (
                  <ul className="grid grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
              <TabsContent value="specifications" className="p-4 border rounded-lg mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Seats:</span>
                    <span className="text-sm">{car.seats}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Doors:</span>
                    <span className="text-sm">{car.doors}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Transmission:</span>
                    <span className="text-sm">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Fuel Type:</span>
                    <span className="text-sm">{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Mileage:</span>
                    <span className="text-sm">{car.mileage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Year:</span>
                    <span className="text-sm">{car.year}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Book this car</CardTitle>
                <CardDescription>Kes{car.price} per day</CardDescription>
                <SignedOut>
                  <CardDescription className="text-destructive">Kindly sign in so that you can book</CardDescription>
                </SignedOut>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Pick-up Date</span>
                  </div>
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Return Date</span>
                  </div>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Mpesa Phone Number</span>
                  </div>
                  <Input type="text" placeholder="07123456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                {startDate && endDate && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Daily Rate:</span>
                        <span className="text-sm">Kes{car.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Days:</span>
                        <span className="text-sm">
                          {Math.max(
                            1,
                            Math.ceil(
                              (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
                            ),
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Subtotal:</span>
                        <span className="text-sm">
                          Kes
                          {car.price *
                            Math.max(
                              1,
                              Math.ceil(
                                (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
                              ),
                            )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Taxes & Fees:</span>
                        <span className="text-sm">
                          Kes
                          {Math.round(
                            car.price *
                              Math.max(
                                1,
                                Math.ceil(
                                  (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
                                ),
                              ) *
                              0.15,
                          )}
                        </span>
                      </div>
                      <div className="border-t my-2"></div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>
                          Kes
                          {Math.round(
                            car.price *
                              Math.max(
                                1,
                                Math.ceil(
                                  (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
                                ),
                              ) *
                              1.15,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <SignedIn>
                  <Button onClick={handlePayment} className="w-full" disabled={!startDate || !endDate || !phone  } >                  
                    {isLoading ? <Loader className='animate-spin'/> : <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Book Now                  
                    </>
                    }
                  </Button>
                </SignedIn>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If you have any questions about this car or the booking process, our customer service team is here to
                  help.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/user/messages">Contact Support</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

