import { youtube } from "@/lib"
import { NextResponse } from "next/server"

// A ping command to ensure that YT endpoints are healthy
export async function GET() {
  const ytChannelEndpoint = youtube.channels({ forHandle: "@mrbeast" })
  const ytVideoEndpoint = youtube.videos({ id: "dQw4w9WgXcQ" })
  const ytPlaylistItemsEndpoint = youtube.playlistItems({
    playlistId: "WL",
  })

  const ytRequestObj = Object.entries({
    channel: ytChannelEndpoint,
    video: ytVideoEndpoint,
    playlistItems: ytPlaylistItemsEndpoint,
  })

  const statusPromise = Promise.all(
    ytRequestObj.map(async ([key, resp]) => {
      const [_, statusCode] = await resp

      return [key, statusCode] as const
    }),
  )

  const statuses = await statusPromise.then((res) => {
    return Object.fromEntries(res)
  })

  return new NextResponse(JSON.stringify(statuses), { status: 200 })
}
