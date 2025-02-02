import { type NextRequest, NextResponse } from "next/server"
import { SponsorBlock } from "@/utils"
import { segmentsFallback } from "@/utils/lockSegmentsFallback"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const videoID = urlParams.get("id")!

  const ACTION_TYPES = ["skip", "mute", "full"] as const
  const mappedActions = ACTION_TYPES.map((actionType) => {
    return SponsorBlock.lockCategories({
      videoID,
      actionTypes: [actionType],
    })
  })

  const [[skipSegments], [muteSegments], [fullSegments]] = await Promise.all(mappedActions)

  return NextResponse.json({
    skip: segmentsFallback(skipSegments),
    mute: segmentsFallback(muteSegments),
    full: segmentsFallback(fullSegments),
  })
}
