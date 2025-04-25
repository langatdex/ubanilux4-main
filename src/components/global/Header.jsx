import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <header className="bg-background px-3 border-b sticky top-0 z-10">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Image
                src='/ubanilux-logo.png'
                alt='logo'
                width={50}
                height={50}
                />
                <span>CarRental</span>
              </div>
              <SignedOut>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                    Home
                  </Link>
                  <Link href="/cars" className="text-sm font-medium hover:underline underline-offset-4">
                    Cars
                  </Link>                
                </nav>
              </SignedOut>
              <SignedIn>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
                    Dashboard
                  </Link>
                  <Link href="/cars" className="text-sm font-medium hover:underline underline-offset-4">
                    Cars
                  </Link>                
                  <Link href="/bookings" className="text-sm font-medium hover:underline underline-offset-4">
                    Bookings
                  </Link>                
                </nav>
              </SignedIn>
              <div className="flex items-center gap-4">
                <SignedIn>
                  <UserButton/>

                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button>Sign In</Button>
                  </SignInButton>                
                </SignedOut>
              </div>
            </div>
    </header>
  )
}

export default Header