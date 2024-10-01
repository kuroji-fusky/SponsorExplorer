import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Navbar, Footer } from "@/components/base"
import { headers } from "next/headers"
import Script from "next/script"

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
  const nonce = headers().get("x-nonce")

  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} antialiased text-sm`}>
        <Script
          id="umami"
          async
          nonce={nonce as string}
          src="https://eu.umami.is/script.js"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
