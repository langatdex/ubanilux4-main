'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, ShieldCheck, Clock } from "lucide-react"
import Header from "@/components/global/Header"


export default function HomePage() {
  
  return (
    <>
      <Header/>
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Premium Car Rental at Your Fingertips
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    Experience the freedom of the road with our extensive fleet of luxury and economy vehicles. Book
                    online in minutes and start your journey today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/cars">
                      <Button size="lg">Browse Cars</Button>
                    </Link>
                    <Link href="/user/register">
                      <Button  size="lg" variant="outline">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="Luxury car"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We offer the best selection of vehicles with unmatched service and convenience.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Premium Fleet</h3>
                  <p className="text-muted-foreground">
                    Choose from our wide selection of well-maintained luxury and economy vehicles.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Fully Insured</h3>
                  <p className="text-muted-foreground">
                    All our vehicles come with comprehensive insurance for your peace of mind.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Our customer service team is available around the clock to assist you.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Renting a car has never been easier. Follow these simple steps to get on the road.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Choose Your Car</h3>
                  <p className="text-muted-foreground">
                    Browse our extensive fleet and select the perfect vehicle for your needs.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Book Online</h3>
                  <p className="text-muted-foreground">
                    Complete your reservation in minutes with our simple booking process.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Enjoy Your Ride</h3>
                  <p className="text-muted-foreground">Pick up your car and hit the road with confidence and style.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of satisfied customers who trust us for their transportation needs.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/cars">
                    <Button size="lg">Browse Cars</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-background border-t py-6">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <Car className="h-5 w-5" />
              <span>CarRental</span>
            </div>
            <nav className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/terms" className="hover:underline underline-offset-4">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CarRental. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

