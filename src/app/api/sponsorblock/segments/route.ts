import { NextRequest, NextResponse } from "next/server"
import { allSegments, SponsorBlock } from "@/utils"
import { Responses } from "@/utils/SponsorBlock.types"

export async function GET(request: NextRequest) {
  const urlParams = new URLSearchParams(request.url)

  const videoID = urlParams.get("id") as string

  // Store all the accumulated segments fetched to be returned from the API
  let _segments: Responses.SearchSegments['segments'] = []

  // Lets us iterate if there are more than 10 segments submitted
  let _iterateCount = 0

  const [initialSegments, searchSegmentsStatus] = await SponsorBlock.searchSegments({
    videoID,
    actionTypes: ["skip", "mute", "full"],
    categories: allSegments,
  })

  let _status = 200

  if (searchSegmentsStatus === 404) _status = 404
  if (searchSegmentsStatus >= 500) _status = searchSegmentsStatus

  // Push initial segments
  if (searchSegmentsStatus !== 404) {
    initialSegments.segments.forEach((segment) => _segments.push(segment))
  }

  // Check if the submitted segments are more than 10, then we iterate it
  if (initialSegments.page > 10) {
  }



  // Then we get the locked segments, if there's any
  const [lockedSkipSegments] = await SponsorBlock.lockCategories({
    videoID,
    actionTypes: ["skip"]
  })

  const [lockedMuteSegments] = await SponsorBlock.lockCategories({
    videoID,
    actionTypes: ["mute"]
  })

  const [lockedFullSegments] = await SponsorBlock.lockCategories({
    videoID,
    actionTypes: ["full"]
  })

  return NextResponse.json({
    segments: _segments,
    lock: {
      skip: lockedSkipSegments,
      mute: lockedMuteSegments,
      full: lockedFullSegments
    },
  }, {
    status: _status
  })
}
