'use client'
import { useUser } from '@clerk/nextjs'
import {DashboardLayout} from './dashboard-layout'
import Header from './Header'

const UserLayout = ({children}) => {
    const { isSignedIn, user, isLoaded } = useUser()
    console.log(user);
    if (user) return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
    return (
        <div>
            <Header/>
            <section className='p-4'>
                {children}
            </section>
        </div>
    )
}

export default UserLayout