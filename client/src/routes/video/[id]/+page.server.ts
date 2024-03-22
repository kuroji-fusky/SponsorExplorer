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

export const load: PageServerLoad = async ({ params }) => {
  const res = await fetch(
    `https://sponsor.ajay.app/api/searchSegments?videoID=${params.id}`
  )

  let contents: SBSegments[] | never[] = []

  try {
    const rawResponse = await res.json()
    const parsedSegments = rawResponse.segments

    contents = parsedSegments.map((segmentItem) => {
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
        // description,
        // uuid: UUID
        description
      }
    })
  } catch {
    contents = []
  }

  return {
    id: params.id,
    items: contents
  }
}
