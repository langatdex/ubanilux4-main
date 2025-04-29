"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader, Upload } from "lucide-react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../../../convex/_generated/api"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { Id } from "../../../../../../convex/_generated/dataModel"

// Define interface for the car data structure
interface CarData {
  _id: string;
  name: string;
  category: string;
  price: number;
  status: "available" | "rented" | "maintenance";
  image: string | null;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  seats: number;
  doors: number;
  images: string[];
  features?: string[];
}

export default function AddCarPage() {
  const generateUploadUrl = useMutation(api.cars.generateUploadUrl)
  const createCar = useMutation(api.cars.updateCar)
  const router = useParams()
  
  // The router.id might be undefined or a string, so we need to check its existence
  const id = router.id ? router.id.toString() : undefined
  
  // Only call the query when we have valid arguments
  const carResponse = useQuery(
    api.cars.fetchCarId, 
    id ? { id: id as unknown as Id<"cars"> } : "skip"
  )

  // Safely cast the car response to our interface
  const car = carResponse as unknown as CarData | undefined

  const [images, setImages] = useState<string[]>([])
  const [imageLoading, setImageLoading] = useState(false)
  const [storageIds, setStorageIds] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [status, setStatus] = useState<"available" | "rented" | "maintenance">("available")
  const [year, setYear] = useState(0)
  const [mileage, setMileage] = useState(0)
  const [fuelType, setFuelType] = useState('')
  const [transmission, setTransmission] = useState('')
  const [description, setDescription] = useState('')
  const [seats, setSeats] = useState(0)
  const [doors, setDoors] = useState(0)
  
  // Update state values when car data is loaded
  useEffect(() => {
    if (car) {
      setName(car.name || '')
      setCategory(car.category || '')
      setPrice(car.price || 0)
      setStatus(car.status || "available")
      setYear(car.year || 0)
      setMileage(car.mileage || 0)
      setFuelType(car.fuelType || '')
      setTransmission(car.transmission || '')
      setDescription(car.description || '')
      setSeats(car.seats || 4)
      setDoors(car.doors || 4)
    }
  }, [car])
  
  if (!car) return null     

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    console.log(e.target.files);
    setImageLoading(true);
    
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const image = e.target.files[i];
        console.log(image.name);
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });
        const { storageId } = await result.json();      
        setStorageIds(prevStorageIds => [...prevStorageIds, storageId]);
        const urlSrc = URL.createObjectURL(image);        
        setImages(prevImages => [...prevImages, urlSrc]);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images");
    } finally {
      setImageLoading(false);
    }
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!car) return;

    setIsLoading(true);

    try {
      const carDetails = {
        id: car._id as unknown as Id<"cars">,
        name,
        category,
        price: Number(price),
        status,
        image: car.image as any,
        year: Number(year),
        mileage: Number(mileage),
        fuelType,
        transmission,
        seats: Number(seats),
        doors: Number(doors),
        description,
        images: car.images as any,
      };
      
      console.log(carDetails);
      await createCar(carDetails);
      toast.success("Successfully updated car");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error("Error updating car", { description: errorMessage });
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/cars">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Modify {car.name}</h1>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Car Details</CardTitle>
              <CardDescription>Enter the details of the car you want to update.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Car Name</Label>
                  <Input 
                    value={name}
                    id="name" 
                    placeholder="e.g. Tesla Model 3" 
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Day (Ksh)</Label>
                  <Input 
                    value={price}
                    id="price" 
                    type="number" 
                    placeholder="e.g. 150" 
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value) => setStatus(value as "available" | "rented" | "maintenance")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input 
                    value={year}
                    id="year" 
                    type="number" 
                    placeholder="e.g. 2023" 
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input 
                    value={mileage}
                    id="mileage" 
                    type="number" 
                    placeholder="e.g. 5000" 
                    onChange={(e) => setMileage(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuel">Fuel Type</Label>
                  <Select
                    value={fuelType}
                    onValueChange={(value) => setFuelType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={transmission}
                    onValueChange={(value) => setTransmission(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  value={description}
                  id="description"
                  placeholder="Enter car description and features..."
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Car Images</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {car.images && car.images.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg border">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Car image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-center">
                      {imageLoading ? 
                      <div className="flex flex-col items-center gap-1 text-center">
                        <Loader className="h-8 w-8 text-amber-400 animate-spin"/>
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer text-sm font-medium text-primary hover:underline"
                        >
                          Loading images
                        </Label>
                      </div>
                      :
                        <div className="flex flex-col items-center gap-1 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer text-sm font-medium text-primary hover:underline"
                        >
                          Upload Images
                        </Label>
                        </div>
                      }
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={imageLoading}                      
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <span className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/admin/cars">Cancel</Link>
              </Button>
              <Button type="submit">{isLoading ? <Loader className="animate-spin"/> : "Update car"}</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}

