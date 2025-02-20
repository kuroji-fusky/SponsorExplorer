"use client"

import { LuCircleX } from "react-icons/lu"
import { useVideoInfoContext } from "@/context/video/VideoInfoProvider"
import { useEffect, useState } from "react"
import type { Category } from "@/lib/SponsorBlock.types"

export function DetailedSegmentStatsContents() {
  const { segmentData } = useVideoInfoContext()

  const [breakdownScreening, setBreakdownScreening] = useState(false)

  useEffect(() => {
    const { segments } = segmentData

    const _filteredSegments =
      segments?.reduce<Category[]>((acc, current) => {
        if (current.category === "chapter") return acc
        return [...acc, current.category]
      }, []) || []

    const hasSufficentCategories =
      Array.from(new Set(_filteredSegments)).length >= 3
    const hasSufficentSubmissions = _filteredSegments.length >= 6

    setBreakdownScreening(hasSufficentCategories && hasSufficentSubmissions)
  }, [segmentData])

  return (
    <div className="py-3.5 prose-h2:my-2 prose-h2:opacity-60">
      <div></div>
      <div>
        <h2>Breakdown</h2>

        {breakdownScreening ? (
          <div>Yay data</div>
        ) : (
          <div className="px-3 py-2.5 bg-red-50 dark:bg-red-950 rounded-md">
            <div className="inline-flex gap-x-2">
              <LuCircleX size={21} className="stroke-red-500" />
              <span>Insufficent data</span>
            </div>
            <p>
              In order to show a detailed breakdown of submissions, a certeria
              must meet one of the following:
            </p>
            <ul className="list-inside list-disc space-y-0.5 ml-2 mt-1">
              <li>At least 3 categories</li>
              <li>6 or more submission</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
