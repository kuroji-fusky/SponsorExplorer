import { type NextRequest, NextResponse } from "next/server"
import { SponsorBlock } from "../../../../utils"
import { segmentsFallback } from "../../../../utils/lockSegmentsFallback"
import { cache } from "react"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const videoID = urlParams.get("id")!

  const skipSegments = cache(() => SponsorBlock.skipSegments({
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
  }))()

  const fullSegments = cache(() => SponsorBlock.skipSegments({
    videoID,
    categories: [
      "selfpromo",
      "sponsor",
      "exclusive_access",
    ],
    actionTypes: ["full"]
  }, { cache: "force-cache" }))()

  const [[skipRes, skipResCode], [fullRes]] = await Promise.all([skipSegments, fullSegments])

  return NextResponse.json({ skip: segmentsFallback(skipRes), full: segmentsFallback(fullRes) }, {
    // This will return 404 if no segments found, but return 200 regardless
    status: skipResCode === 404 ? 200 : skipResCode
  })
}
