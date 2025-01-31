import { type NextRequest, NextResponse } from "next/server"
import { SponsorBlock } from "@/utils"
import { segmentsFallback } from "@/utils/lockSegmentsFallback"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const videoID = urlParams.get("id")!

  const skipSegments = SponsorBlock.skipSegments({
    videoID,
    categories: [
      "interaction",
      "intro",
      "outro",
      "filler",
      "preview",
      "interaction",
      "music_offtopic",
      "selfpromo",
      "sponsor",
      "poi_highlight"
    ],
    actionTypes: ["skip", "mute"]
  })

  const fullSegments = SponsorBlock.skipSegments({
    videoID,
    categories: [
      "selfpromo",
      "sponsor",
      "exclusive_access",
    ],
    actionTypes: ["full"]
  })

  const [[skipRes], [fullRes]] = await Promise.all([skipSegments, fullSegments])

  return NextResponse.json({ skip: segmentsFallback(skipRes), full: segmentsFallback(fullRes) })
}
