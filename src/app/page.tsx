import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
}

export default function Home() {
  return <div>Landing page</div>
}
