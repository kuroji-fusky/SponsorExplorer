import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Footer, Navbar } from "@/components/Base"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: 'Home',
    template: '%s - SponsorExplorer'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
