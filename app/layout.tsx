import "./globals.css";
import { GeistSans } from "geist/font/sans";
import LandingNavbar from "@/components/landing-navbar";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cashlog",
  description: "Cashlog app is a expense tracker PWA.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
