import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Navbar, Footer } from "@/components/Base"
import { cn } from "@/utils"
import { OptionsProvider } from "@/context"
import { PreloadResources } from "./preload-resources"

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  preload: true,
  display: "swap",
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: {
    default: "",
    template: "%s | SponsorExplorer",
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={cn(
          inter.className,
          "antialiased text-sm overflow-x-hidden prose-headings:font-bold",
          "dark:text-neutral-100 dark:bg-neutral-950 text-neutral-800",
        )}
      >
        <PreloadResources />
        <OptionsProvider>
          <Navbar />
          <main className="min-h-[calc(100dvh-12.75rem)]">{children}</main>
          <Footer />
        </OptionsProvider>
      </body>
    </html>
  )
}
