import { NextRequest, NextResponse } from "next/server"
import { allSegments, SponsorBlock } from "@/utils"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const videoID = params.id
  // const urlParams = new URLSearchParams(request.url)
  // const categoryParams = urlParams.get("categories")
  // const actionTypeParams = urlParams.get("actionTypes")

  const [skipSegments, skipSegmentsStatus] = await SponsorBlock.skipSegments({
    videoID,
    actionTypes: ["skip", "mute"],
    categories: allSegments,
  })

  const [fullSegments, fullSegmentsStatus] = await SponsorBlock.skipSegments({
    videoID,
    actionTypes: ["full"],
    categories: ["sponsor", "exclusive_access", "selfpromo"]
  })

  const [lockedSegments, lockedSegmentsStatus] = await SponsorBlock.lockCategories({
    videoID,
  })

  return NextResponse.json({
    p: params.id,
    skipSegments: {
      statusCode: skipSegmentsStatus,
      data: skipSegments,
    },
    fullSegments: {
      statusCode: fullSegmentsStatus,
      data: fullSegments,
    },
    lockSegments: {
      statusCode: lockedSegmentsStatus,
      data: lockedSegments,
    },
  }, {
    status: 200
  })
}
