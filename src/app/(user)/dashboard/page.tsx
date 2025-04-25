import React from 'react'
import UserDashboard from './UserDashboard'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const page = async () => {
  const user = await currentUser()
  if (!user) redirect("/")  
  if (user.publicMetadata.role == 'admin') redirect('/admin/dashboard')
  return (
    <>
    <UserDashboard/>
    </>
  )
}

export default page