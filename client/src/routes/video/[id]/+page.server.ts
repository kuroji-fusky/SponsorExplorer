import type { Segments } from "$lib/types"
import type { PageServerLoad } from "./$types"

interface SBSegments {
  submittedDate: string
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

export const load: PageServerLoad = async ({ params }) => {
  const segmentRes = await fetch(`${SB_BASE_URL}/skipSegments?videoID=${params.id}`)
  const lockedRes = await fetch(`${SB_BASE_URL}/lockCategories?videoID=${params.id}`)

  let parsedSegments: SBSegments[] | never[] = []
  let lockedSegments = {}

  try {
    const segmentJSONRes = await segmentRes.json()
    const lockedJSONRes = await lockedRes.json()

    console.log(segmentJSONRes)

    // lockedSegments = {}

    parsedSegments = segmentJSONRes.segments.map((segmentItem) => {
      const {
        timeSubmitted,
        UUID,
        category,
        actionType,
        views,
        votes,
        locked,
        shadowHidden,
        hidden,
        description
      } = segmentItem

      const readableDate = new Date(timeSubmitted).toISOString()

      return {
        submittedDate: readableDate,
        segmentLabel: category,
        segmentAction: actionType,
        views,
        votes,
        isLocked: !!locked,
        isHidden: !!hidden,
        isShadowHidden: !!shadowHidden,
        uuid: UUID,
        description
      }
    })
  } catch {
    parsedSegments = []
  }

  return {
    id: params.id,
    // segCount:,
    items: parsedSegments
  }
}
