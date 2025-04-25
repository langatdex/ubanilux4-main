import { DashboardLayout } from '../../components/global/dashboard-layout';
import UserLayout from '../../components/global/UserLayout';

export const metadata = {
  title: "Ubanilux - Car Rentl",
  description: "Experience the freedom of the road with our extensive fleet of luxury and economy vehicles. Book online in minutes and start your journey today.",
};

export default function RootLayout({
  children,
}) {
  return (
    <UserLayout>
      {children}
    </UserLayout>    
  );
}
