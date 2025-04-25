'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ellipsis, Search } from "lucide-react"
import {getAllUsers,banUser,unBanUser,updateRole} from '@/lib/users'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"



// Mock data for users
const users = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
    status: "Active",
    bookings: 5,
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    joinDate: "2023-02-20",
    status: "Active",
    bookings: 3,
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

const AdminUsersPage = () => {
  const [data,setData] = useState(null)
      
  useEffect(() => {
    const fetchUsers = async () => {
      await fetch('/api/users')
      .then((res) => res.json())
      .then(data => {        
        setData(data)
      })
      
    }
    fetchUsers()
  },[])
  console.log(data);
  if (data == undefined) return null
  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and customer information.</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>You have {data.data.length} registered users.</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search users..." className="w-full" />
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
                  <TableHead>Profile</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>                  
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((user) => {
                  const createdDate = new Date(user.createdAt)
                  const createdDateString = createdDate.toLocaleDateString()
                  return (
                    <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.emailAddresses[0].emailAddress}</TableCell>
                    
                    <TableCell>{createdDateString}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.banned ? "Banned" : "Active"}
                      </span>
                    </TableCell>
                    <TableCell>4</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="outline" size="sm">
                              <Ellipsis/>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent> 
                            {user.publicMetadata.role == 'admin' ?
                            <DropdownMenuItem
                            onClick={() => updateRole({
                              user:user.id,
                              role:'user'
                            })}
                            >Become user</DropdownMenuItem>
                            :
                            <DropdownMenuItem
                            onClick={() => updateRole({
                              user:user.id,
                              role:'admin'
                            })}
                            >Become admin</DropdownMenuItem>
                            }

                            {user.banned == false ?
                            <DropdownMenuItem 
                            onClick={() => banUser(user.id)}
                            className="bg-destructive text-white">Ban user</DropdownMenuItem>                            
                            :
                            <DropdownMenuItem 
                            onClick={() => unBanUser(user.id)}
                            className="bg-green-600 text-white">Unban user</DropdownMenuItem>                            
                            }
                          </DropdownMenuContent>
                        </DropdownMenu>

                      </div>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default AdminUsersPage