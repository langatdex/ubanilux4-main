"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Car,
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  Home,
  CreditCard,
  BarChart,
  MessageSquare,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"

interface DashboardLayoutProps {
  children: React.ReactNode
  isAdmin?: boolean
}

export function DashboardLayout({ children, isAdmin = false }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const userNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Browse Cars",
      href: "/cars",
      icon: Car,
    },
    {
      title: "My Bookings",
      href: "/bookings",
      icon: Calendar,
    },    
  ]

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Cars",
      href: "/admin/cars",
      icon: Car,
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },    
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Image
                  src='/ubanilux-logo.png'
                  alt='logo'
                  width={50}
                  height={50}
                />
                <span>CarRental</span>
              </Link>
              <div className="my-4 border-t" />
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent",
                    pathname === item.href ? "bg-accent" : "transparent",
                  )}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
              <div className="my-4 border-t" />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src='/ubanilux-logo.png'
                alt='logo'
                width={50}
                height={50}
                />
            <span>CarRental</span>
          </Link>
          <div className="hidden md:flex md:gap-2">
            <span className="text-sm text-muted-foreground">{isAdmin ? "Admin Portal" : "User Portal"}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <UserButton/>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden sticky w-64 border-r bg-background md:block">
          <nav className="grid gap-2 p-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent",
                  pathname === item.href ? "bg-accent" : "transparent",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto  p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

