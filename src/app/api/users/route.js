import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET (request){
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ message: 'No Logged In User' }, { status: 401 })
  }

  const client = await clerkClient()

  try {
    const res = await client.users.getUserList()
    console.log(res);
    return NextResponse.json(res)
  } catch (err) {
    return NextResponse.json(err, { status: 500 })
  }

}

