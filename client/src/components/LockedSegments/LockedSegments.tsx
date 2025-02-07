"use client"

import { useEffect, useState } from "react"
import { LockedSegmentsNotice } from "./LockedSegmentsNotice"
import { ShowIf } from "../ShowIf"
import type { sb } from "../../utils/SponsorBlock.types"
import { useLiveSegmentContext, useVideoInfoContext } from "../../context"
import { SponsorBlock } from "../../utils"
import { fetchWrapper } from "../../utils/fetchWrapper"

export function LockedSegments() {
  const { hasLiveUpdates } = useLiveSegmentContext()
  const {
    videoDetails: { id },
  } = useVideoInfoContext()

  const [hasLockedSegments, setHasLockedSegments] = useState(false)
  const [lockReason, setLockReason] = useState(null)
  const [lockSegments, setLockSegments] = useState({})

  useEffect(() => {
    const { location } = window
    const fetchLockSegments = fetchWrapper<
      Record<string, sb.Responses.LockCategories>
    >(`${location.origin}/api/sb/lockCategories?id=${id}`)

    fetchLockSegments.then(([res]) => {
      const { skip, mute, full } = res
      const lockSegments = { skip, mute, full }

      const _lockSegmentValues = Object.values(lockSegments)
      const hasLockedSegments = _lockSegmentValues.every((i) => i !== null)

      setHasLockedSegments(hasLockedSegments)
      setLockSegments(lockSegments)
    })
  }, [id])

  return (
    <ShowIf condition={hasLockedSegments}>
      <div className="my-2">
        <LockedSegmentsNotice reason={lockReason} />
      </div>
    </ShowIf>
  )
}
