import { type NextRequest, NextResponse } from "next/server"
import { allSegments, SponsorBlock } from "@/lib"
import { segmentsFallback } from "@/utils"
import { SB_FETCH_OPTIONS } from "@/utils/constants"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const videoID = urlParams.get("id")!

  const skipSegments = SponsorBlock.skipSegments({
    videoID,
    categories: allSegments,
    actionTypes: ["skip", "mute"]
  }, SB_FETCH_OPTIONS)

  const fullSegments = SponsorBlock.skipSegments({
    videoID,
    categories: [
      "selfpromo",
      "sponsor",
      "exclusive_access",
    ],
    actionTypes: ["full"]
  }, SB_FETCH_OPTIONS)

  const [[skipRes, skipResCode], [fullRes]] = await Promise.all([skipSegments, fullSegments])

  return NextResponse.json({ skip: segmentsFallback(skipRes), full: segmentsFallback(fullRes) }, {
    // This will return 404 if no segments found, but return 200 regardless
    status: skipResCode === 404 ? 200 : skipResCode
  })
}
