import type { Segments } from "$lib/types"
import type { PageServerLoad } from "./$types"

interface SBSegments {
  submittedDate: string
  submittedDateReadable: string
  segmentLabel: Segments
  segmentAction: string
  views: number
  votes: number
  isLocked: boolean
  isHidden: boolean
  isShadowHidden: boolean
  description: string
  uuid: string
}

const SB_BASE_URL = "https://sponsor.ajay.app/api"

const endpoints = {
  segments: {
    search: `${SB_BASE_URL}/searchSegments`,
    lock: `${SB_BASE_URL}/lockCategories`
  }
}

export const load: PageServerLoad = async ({ params }) => {
  // YouTube Data API

  // SponsorBlock
  // I'll clean this up sometime, this is an eyesore lol
  const segmentRes = await fetch(`${endpoints.segments.search}?videoID=${params.id}`)
  // const lockedRes = await fetch(
  //   `${SB_BASE_URL}/lockCategories?videoID=${params.id}&service=YouTube&actionTypes=["skip","poi","chapter","mute","full"]`
  // )

  let errorMsg = ""
  let parsedSegments: SBSegments[] | never[] = []
  // let lockedSegments = {}

  try {
    const segmentJSONRes = await segmentRes.json()
    // const lockedJSONRes = await lockedRes.json()

    console.log({ seggs: segmentJSONRes.segments })
    parsedSegments = segmentJSONRes.segments.map((segment) => {
      const {
        timeSubmitted,
        UUID,
        category,
        actionType,
        votes,
        views,
        locked,
        shadowHidden,
        hidden,
        description,
        userID
      } = segment

      const _date = new Date(timeSubmitted)

      const isoDate = _date.toISOString()
      const readableDate = _date
        .toLocaleString("en-US", {
          hourCycle: "h23"
        })
        .replace(", ", " ")
        .replace(/\//g, "-")

      return {
        submittedDate: isoDate,
        submittedDateReadable: readableDate,
        segmentLabel: category,
        segmentAction: actionType,
        votes,
        views,
        isLocked: Boolean(locked),
        isHidden: Boolean(hidden),
        isShadowHidden: Boolean(shadowHidden),
        uuid: UUID,
        userid: userID,
        actionType,
        description
      }
    })
  } catch {
    if (segmentRes.status === 404) {
      errorMsg =
        "Couldn't fetch segments, either the video ID is invalid, the main server (https://sponsor.ajay.app/) is temporarily unavailable or couldn't handle request. Switch to a different server as they have cached segments at this time."
    }
  }

  return {
    id: params.id,
    sponsorblock: {
      statusCode: segmentRes.status,
      items: parsedSegments,
      errors: errorMsg
    }
  }
}
