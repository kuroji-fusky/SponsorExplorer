"use client"

import { formatNumber, formatTimecode } from "@/utils"
import { Modal } from "./Modal"
import type { ModalDialogTypes } from "./Modal.types"
import type { SegmentBank } from "@/types"
import { SegmentBadge } from "../Badges"
import type { Category } from "@/lib"
import { Fragment } from "react"

type SegmentDetailsModal = ModalDialogTypes &
  Omit<SegmentBank, "submissionCount">

interface DetailedData {
  category: Category
  views: number
  segTime: number
  totalAccrued: number
}

export function SegmentDetailsModal(props: SegmentDetailsModal) {
  const _dataFiltered = props.segments
    .filter((x) => x.actionType === "skip" || x.actionType == "mute")
    .map((item) => {
      return {
        category: item.category,
        views: item.views,
        segTime: (item as unknown as { accrued: number }).accrued,
      }
    }) satisfies Partial<DetailedData>[]

  const detailData = Object.values(
    _dataFiltered.reduce<Record<string, DetailedData>>((acc, data) => {
      const { category, views, segTime } = data

      if (!acc[category])
        acc[category] = { category, views: 0, segTime: 0, totalAccrued: 0 }

      acc[category].views += views
      acc[category].segTime += segTime

      acc[category].totalAccrued += views * segTime

      return acc
    }, {}),
  )

  return (
    <Modal onClose={props.onClose} open={props.open} title="Submission details">
      <div className="w-fit">
        <table className="border-collapse *:!text-base">
          <thead className="*:text-left">
            <tr className="*:whitespace-nowrap *:w-min *:px-2 *:py-1.5">
              <th>Category</th>
              <th>Views</th>
              <th>Length accrued</th>
              <th>Total of time(s) viewed</th>
            </tr>
          </thead>
          <tbody>
            {detailData.map((row, index) => (
              <Fragment key={index}>
                <tr className="*:px-2 *:py-2">
                  <td>
                    <SegmentBadge segments={row.category}  layout="desktop" />
                  </td>
                  <td>{formatNumber(row.views)}</td>
                  <td>
                    {formatTimecode(row.segTime, { separator: "letters" })}
                  </td>
                  <td>
                    {formatTimecode(row.totalAccrued, { separator: "letters" })}
                  </td>
                </tr>
                {/* <tr className="bg-red-500">
                  <td colSpan={4}>Expandable</td>
                </tr> */}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
