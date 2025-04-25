// Types
export interface Car {
    id: string
    name: string
    category: string
    price: number
    status: "Available" | "Rented" | "Maintenance"
    image: string
    year: number
    mileage: number
    fuelType: string
    transmission: string
    seats: number
    doors: number
    features: string[]
    description: string
    images: string[]
  }
  
  export interface User {
    id: string
    name: string
    email: string
    phone: string
    joinDate: string
    status: "Active" | "Inactive"
    bookings: number
    address?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    profileImage?: string
    preferences?: {
      preferredCategory?: string
      preferredTransmission?: string
      preferredPayment?: string
      preferredCurrency?: string
      notifications: {
        bookings: boolean
        promotions: boolean
        newsletter: boolean
      }
    }
  }
  
  export interface Booking {
    id: string
    userId: string
    carId: string
    user: string
    car: string
    startDate: string
    endDate: string
    status: "Active" | "Upcoming" | "Completed" | "Cancelled"
    total: number
    image: string
    paymentStatus: "Paid" | "Pending" | "Failed"
    paymentMethod: string
    createdAt: string
  }
  
  export interface DashboardStats {
    revenue: {
      total: number
      percentChange: number
    }
    activeBookings: {
      total: number
      percentChange: number
    }
    availableCars: {
      total: number
      new: number
    }
    activeUsers: {
      total: number
      new: number
    }
    recentBookings: {
      user: string
      car: string
      time: string
      amount: number
    }[]
  }
  
  export interface UserActivity {
    type: "booking" | "payment" | "message"
    description: string
    time: string
    icon: string
  }
  
  // Mock Data
  export const cars: Car[] = [
    {
      id: "CAR001",
      name: "Tesla Model 3",
      category: "Electric",
      price: 150,
      status: "Available",
      image: "/placeholder.svg?height=50&width=80",
      year: 2023,
      mileage: 5000,
      fuelType: "Electric",
      transmission: "Automatic",
      seats: 5,
      doors: 4,
      features: [
        "Autopilot",
        '15" Touchscreen Display',
        "Wireless Phone Charging",
        "Premium Audio System",
        "Heated Seats",
        "Glass Roof",
        "360° Cameras",
        "Keyless Entry",
      ],
      description:
        "The Tesla Model 3 is an electric four-door sedan developed by Tesla. The Model 3 Standard Range Plus version delivers an EPA-rated all-electric range of 263 miles (423 km) and the Long Range versions deliver 353 miles (568 km).",
      images: [
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
      ],
    },
    {
      id: "CAR002",
      name: "BMW X5",
      category: "SUV",
      price: 200,
      status: "Rented",
      image: "/placeholder.svg?height=50&width=80",
      year: 2022,
      mileage: 15000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 7,
      doors: 5,
      features: [
        "Panoramic Sunroof",
        "Leather Seats",
        "Navigation System",
        "Bluetooth Connectivity",
        "Parking Sensors",
        "Heated Seats",
        "Climate Control",
        "Cruise Control",
      ],
      description:
        "The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW. It features all-wheel drive and is available with either a gasoline or diesel engine.",
      images: [
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
      ],
    },
    {
      id: "CAR003",
      name: "Mercedes C-Class",
      category: "Sedan",
      price: 180,
      status: "Available",
      image: "/placeholder.svg?height=50&width=80",
      year: 2022,
      mileage: 12000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      doors: 4,
      features: [
        "Leather Interior",
        "MBUX Infotainment System",
        "Wireless Charging",
        "LED Headlights",
        "Ambient Lighting",
        "Keyless Go",
        "Burmester Sound System",
        "Driver Assistance Package",
      ],
      description:
        "The Mercedes-Benz C-Class is a line of compact executive cars produced by Mercedes-Benz. Introduced in 1993 as a replacement for the 190 range, the C-Class has been available with a 'traditional' sedan/saloon, station wagon/estate, coupé, and convertible body styles.",
      images: [
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
      ],
    },
    {
      id: "CAR004",
      name: "Toyota Camry",
      category: "Sedan",
      price: 120,
      status: "Maintenance",
      image: "/placeholder.svg?height=50&width=80",
      year: 2021,
      mileage: 25000,
      fuelType: "Hybrid",
      transmission: "Automatic",
      seats: 5,
      doors: 4,
      features: [
        "Toyota Safety Sense",
        "Apple CarPlay & Android Auto",
        "JBL Audio System",
        "Dual-Zone Climate Control",
        "Wireless Charging",
        "Panoramic Sunroof",
        "Leather Seats",
        "Keyless Entry",
      ],
      description:
        "The Toyota Camry is an automobile sold internationally by the Japanese manufacturer Toyota since 1982, spanning multiple generations. The Camry has been the best-selling passenger car in the United States for 17 years.",
      images: [
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
      ],
    },
    {
      id: "CAR005",
      name: "Range Rover Sport",
      category: "SUV",
      price: 250,
      status: "Available",
      image: "/placeholder.svg?height=50&width=80",
      year: 2023,
      mileage: 8000,
      fuelType: "Diesel",
      transmission: "Automatic",
      seats: 7,
      doors: 5,
      features: [
        "Meridian Sound System",
        "Panoramic Roof",
        "Terrain Response 2",
        "Adaptive Dynamics",
        "Head-up Display",
        "Heated and Cooled Seats",
        "Configurable Ambient Lighting",
        "Interactive Driver Display",
      ],
      description:
        "The Range Rover Sport is a luxury mid-size SUV produced by Land Rover. The first generation was produced from 2005 to 2013, and the second generation has been manufactured since 2013. It is Land Rover's third model to use an all-aluminium monocoque structure.",
      images: [
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
      ],
    },
    {
      id: "CAR006",
      name: "Audi A4",
      category: "Sedan",
      price: 170,
      status: "Available",
      image: "/placeholder.svg?height=50&width=80",
      year: 2022,
      mileage: 18000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      doors: 4,
      features: [
        "Audi Virtual Cockpit",
        "MMI Navigation Plus",
        "Bang & Olufsen Sound System",
        "Audi Pre Sense",
        "Leather Seats",
        "Panoramic Sunroof",
        "Wireless Charging",
        "Ambient Lighting",
      ],
      description:
        "The Audi A4 is a line of compact executive cars produced since 1994 by the German car manufacturer Audi, a subsidiary of the Volkswagen Group. The A4 has been built in five generations and is based on the Volkswagen Group B platform.",
      images: [
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
      ],
    },
  ]
  
  export const users: User[] = [
    {
      id: "USR001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2023-01-15",
      status: "Active",
      bookings: 5,
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "United States",
      profileImage: "/placeholder.svg?height=100&width=100",
      preferences: {
        preferredCategory: "SUV",
        preferredTransmission: "Automatic",
        preferredPayment: "Credit Card",
        preferredCurrency: "USD",
        notifications: {
          bookings: true,
          promotions: true,
          newsletter: true,
        },
      },
    },
    {
      id: "USR002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      joinDate: "2023-02-20",
      status: "Active",
      bookings: 3,
      address: "456 Oak Ave",
      city: "Somewhere",
      state: "NY",
      zipCode: "67890",
      country: "United States",
      profileImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "USR003",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
      joinDate: "2023-03-10",
      status: "Inactive",
      bookings: 0,
    },
    {
      id: "USR004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 234-5678",
      joinDate: "2023-04-05",
      status: "Active",
      bookings: 2,
    },
    {
      id: "USR005",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 876-5432",
      joinDate: "2023-05-12",
      status: "Active",
      bookings: 1,
    },
  ]
  
  export const bookings: Booking[] = [
    {
      id: "BK001",
      userId: "USR001",
      carId: "CAR001",
      user: "John Doe",
      car: "Tesla Model 3",
      startDate: "2023-10-15",
      endDate: "2023-10-20",
      status: "Active",
      total: 750,
      image: "/placeholder.svg?height=80&width=120",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      createdAt: "2023-10-10",
    },
    {
      id: "BK002",
      userId: "USR001",
      carId: "CAR002",
      user: "John Doe",
      car: "BMW X5",
      startDate: "2023-10-18",
      endDate: "2023-10-25",
      status: "Upcoming",
      total: 1400,
      image: "/placeholder.svg?height=80&width=120",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      createdAt: "2023-10-05",
    },
    {
      id: "BK003",
      userId: "USR002",
      carId: "CAR003",
      user: "Jane Smith",
      car: "Mercedes C-Class",
      startDate: "2023-10-10",
      endDate: "2023-10-14",
      status: "Completed",
      total: 720,
      image: "/placeholder.svg?height=80&width=120",
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      createdAt: "2023-10-01",
    },
    {
      id: "BK004",
      userId: "USR004",
      carId: "CAR005",
      user: "Emily Davis",
      car: "Range Rover Sport",
      startDate: "2023-10-22",
      endDate: "2023-10-29",
      status: "Upcoming",
      total: 1750,
      image: "/placeholder.svg?height=80&width=120",
      paymentStatus: "Pending",
      paymentMethod: "Credit Card",
      createdAt: "2023-10-15",
    },
    {
      id: "BK005",
      userId: "USR005",
      carId: "CAR004",
      user: "Michael Wilson",
      car: "Toyota Camry",
      startDate: "2023-10-05",
      endDate: "2023-10-12",
      status: "Completed",
      total: 840,
      image: "/placeholder.svg?height=80&width=120",
      paymentStatus: "Paid",
      paymentMethod: "Debit Card",
      createdAt: "2023-09-28",
    },
  ]
  
  export const adminDashboardStats: DashboardStats = {
    revenue: {
      total: 45231.89,
      percentChange: 20.1,
    },
    activeBookings: {
      total: 12,
      percentChange: 19,
    },
    availableCars: {
      total: 24,
      new: 2,
    },
    activeUsers: {
      total: 573,
      new: 201,
    },
    recentBookings: [
      {
        user: "John Doe",
        car: "Tesla Model 3",
        time: "1 hour ago",
        amount: 750,
      },
      {
        user: "Jane Smith",
        car: "BMW X5",
        time: "2 hours ago",
        amount: 1400,
      },
      {
        user: "Emily Davis",
        car: "Range Rover Sport",
        time: "3 hours ago",
        amount: 1750,
      },
      {
        user: "Michael Wilson",
        car: "Toyota Camry",
        time: "4 hours ago",
        amount: 840,
      },
    ],
  }
  
  export const userDashboardStats = {
    activeRentals: 1,
    upcomingBookings: 1,
    totalSpent: 1250,
    unreadMessages: 2,
  }
  
  export const userActivities: UserActivity[] = [
    {
      type: "booking",
      description: "You booked a Tesla Model 3",
      time: "2 days ago",
      icon: "car",
    },
    {
      type: "payment",
      description: "Payment processed for BMW X5",
      time: "5 days ago",
      icon: "credit-card",
    },
    {
      type: "message",
      description: "You received a message from support",
      time: "1 week ago",
      icon: "message-square",
    },
  ]
  
  // Helper function to get bookings by user ID
  export const getBookingsByUserId = (userId: string): Booking[] => {
    return bookings.filter((booking) => booking.userId === userId)
  }
  
  // Helper function to get bookings by status
  export const getBookingsByStatus = (status: Booking["status"]): Booking[] => {
    return bookings.filter((booking) => booking.status === status)
  }
  
  // Helper function to get car by ID
  export const getCarById = (carId: string): Car | undefined => {
    return cars.find((car) => car.id === carId)
  }
  
  // Helper function to get user by ID
  export const getUserById = (userId: string): User | undefined => {
    return users.find((user) => user.id === userId)
  }
  
  // Helper function to get available cars
  export const getAvailableCars = (): Car[] => {
    return cars.filter((car) => car.status === "Available")
  }
  
  // Helper function to calculate booking statistics
  export const getBookingStatistics = () => {
    const total = bookings.length
    const active = bookings.filter((booking) => booking.status === "Active").length
    const upcoming = bookings.filter((booking) => booking.status === "Upcoming").length
    const completed = bookings.filter((booking) => booking.status === "Completed").length
    const cancelled = bookings.filter((booking) => booking.status === "Cancelled").length
  
    return {
      total,
      active,
      upcoming,
      completed,
      cancelled,
    }
  }
  
  // Helper function to calculate revenue
  export const calculateTotalRevenue = (): number => {
    return bookings.reduce((total, booking) => total + booking.total, 0)
  }
  
  