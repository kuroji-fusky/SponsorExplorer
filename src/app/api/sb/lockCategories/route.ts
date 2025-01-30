import { type NextRequest, NextResponse } from "next/server"
import { SponsorBlock } from "@/utils"
import type { sb } from "@/utils/SponsorBlock.types"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const videoID = urlParams.get("id")!

  const lockSegmentsFallback = (lockedSegments: sb.Responses.LockCategories) => {
    return typeof lockedSegments === "string" ? null : lockedSegments
  }

  const ACTION_TYPES = ["skip", "mute", "full"] as const
  const mappedActions = ACTION_TYPES.map((actionType) => {
    return SponsorBlock.lockCategories({
      videoID,
      actionTypes: [actionType],
    })
  })

  const [[skipSegments], [muteSegments], [fullSegments]] = await Promise.all(mappedActions)

  return NextResponse.json({
    skip: lockSegmentsFallback(skipSegments),
    mute: lockSegmentsFallback(muteSegments),
    full: lockSegmentsFallback(fullSegments),
  })
}
