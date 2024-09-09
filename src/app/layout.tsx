import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar, Footer } from "@/components/base"

const inter = Inter({
  weight: ["300", "600", "700"],
  preload: true,
  display: "swap",
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: {
    default: "",
    template: "%s | SponsorExplorer",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
