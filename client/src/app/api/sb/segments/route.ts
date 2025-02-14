/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server"
import { allSegments, padIterations, SponsorBlock } from "@/utils"
import type { sb } from "@/utils/SponsorBlock.types"
import { segmentsFallback } from "@/utils/lockSegmentsFallback"
import { mapValues, sortBy } from "lodash-es"

type _UnwrapArray<I> = I extends Array<infer U> ? U : never

type SortByLiteral = "asc" | "desc"
type SBSegment = Array<_UnwrapArray<sb.Responses.SearchSegments['segments']> & { __next_iterableFragment: number }>

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams

  const params = {
    id: urlParams.get("id")!,
    pageFrom: parseInt(urlParams.get("pageFrom")!) || null,
    pageTo: parseInt(urlParams.get("pageTo")!) || 8,
    sortBy: urlParams.get("sortBy") as SortByLiteral || "desc",
  }

  // Store all the accumulated segments fetched to be returned from the API
  /* eslint-disable-next-line prefer-const */
  let _totalSegments: SBSegment = []

  const _storeTotalSegments = (segmentsToPush: SBSegment) => {
    segmentsToPush.forEach((segment) => _totalSegments.push(segment))
  }

  // This helps us to keep track whether if there are more than 10 segments submitted
  // SponsorBlock only allows 10 segments per page
  let _iterateCount = 0

  const [initialSegments, searchSegmentsStatus] = await SponsorBlock.searchSegments({
    videoID: params.id,
    actionTypes: ["skip", "mute", "full"],
    categories: allSegments,
  })

  let _status = 200

  if (searchSegmentsStatus === 404) _status = 404
  if (searchSegmentsStatus >= 500) _status = searchSegmentsStatus

  const { segmentCount, segments } = initialSegments

  // Push initial segments
  if (searchSegmentsStatus !== 404) _storeTotalSegments(
    segments.map(item => ({ __next_iterableFragment: 1, ...item }))
  )

  // Will be used to calculate the total iterations and to be used client-side for pagination
  let totalIterations = 0

  // Check if the submitted segments are more than 10, then we iterate it
  if (segmentCount > 10) {
    totalIterations = Math.ceil(segmentCount / 10) - 1

    // Cap page iteration until 8 by default or the total iterations
    _iterateCount = totalIterations > params.pageTo ? params.pageTo : totalIterations as number

    const segmentPromises = padIterations(_iterateCount).map((_, i) => {
      const segmentIndex = i + 1

      return SponsorBlock.searchSegments({
        videoID: params.id,
        page: segmentIndex
      }).then(([partialSegments]) => {
        _storeTotalSegments(
          partialSegments.segments.map(item => ({ __next_iterableFragment: segmentIndex, ...item }))
        )
      })
    })

    await Promise.all(segmentPromises)
  }

  // Then we get the locked segments, if there's any
  const [[lockedSkipSegments], [lockedMuteSegments], [lockedFullSegments]] = await Promise.all([
    SponsorBlock.lockCategories({
      videoID: params.id,
      actionTypes: ["skip"]
    }),
    SponsorBlock.lockCategories({
      videoID: params.id,
      actionTypes: ["mute"]
    }),
    SponsorBlock.lockCategories({
      videoID: params.id,
      actionTypes: ["full"]
    })
  ])

  // Convert the timeSubmitted to a UTC string
  _totalSegments.map((segment) => {
    segment.timeSubmitted = new Date(segment.timeSubmitted).toUTCString()
  })

  // Sort the segments in descending order by default
  const sortedSegments = sortBy(_totalSegments, (segment) => new Date(segment.timeSubmitted))

  const _lockedSegments = {
    skip: (segmentsFallback(lockedSkipSegments)),
    mute: (segmentsFallback(lockedMuteSegments)),
    full: (segmentsFallback(lockedFullSegments))
  }

  let lockReason: string | null = null
  // A lock reason could possibly have one or more reasons set by a VIP
  const _lockReasonSet = new Set<string>()

  const hasLockedSegments = !(_lockedSegments.skip === null && _lockedSegments.mute === null && _lockedSegments.full === null)

  const lockValues = Object.values(_lockedSegments).filter(Boolean) as sb.Responses.LockCategories[]

  if (hasLockedSegments) {
    lockValues.forEach(({ reason }) => {
      if (reason === null) return
      _lockReasonSet.add(reason)
    })

    const reasonFiltered = Array.from(_lockReasonSet).filter(Boolean)

    lockReason = reasonFiltered[0]
  }

  const lockedSegments = mapValues(_lockedSegments, (value) => value?.categories || [])

  return NextResponse.json({
    totalIterations,
    submissionCount: segmentCount,
    hasLockedSegments,
    lockedSegments,
    lockReason: lockReason ?? null,
    segments: sortedSegments,
  }, {
    status: _status
  })
}
