import { NextRequest, NextResponse } from "next/server"
import { SponsorBlock } from "@/utils"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const videoID = params.id

  const skipSegments = await SponsorBlock.skipSegments({
    videoID,
    actionTypes: ["skip", "mute"],
  })

  const fullSegments = await SponsorBlock.skipSegments({
    videoID,
    actionTypes: ["full"],
  })

  const hasLockedSegments = await SponsorBlock.lockedSegments({
    videoID,
  })

  console.log(skipSegments)

  return NextResponse.json({
    p: params.id,
    skipSegments: {
      statusCode: skipSegments.status,
      data: skipSegments,
    },
  })
}
