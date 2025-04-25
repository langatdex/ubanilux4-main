import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ubanilux - Car Rentl",
  description: "Experience the freedom of the road with our extensive fleet of luxury and economy vehicles. Book online in minutes and start your journey today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
        <ClerkProvider>                        
          {children}
          <Toaster/>
        </ClerkProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
