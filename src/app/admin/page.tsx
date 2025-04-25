import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  if (!user) redirect("/")
  if (user.publicMetadata.role != 'admin') redirect('/dashboard')
  if (user.publicMetadata.role == 'admin') redirect('/admin/dashboard')
  return (
    <div></div>
  )
}

export default page