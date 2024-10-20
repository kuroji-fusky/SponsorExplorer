import { Category } from "@/utils/SponsorBlock.types"
import { SegmentBadge } from "./badges"
import {
  LuEyeOff,
  LuLock,
  LuMoreVertical,
  LuTimerOff,
  LuXCircle,
} from "react-icons/lu"
import type { VideoSegments } from "@/types"
import { cn } from "@/utils"

interface SegmentTableProps extends Omit<VideoSegments, "lock"> {
  selectMode?: boolean
}

export function SegmentTable(props: SegmentTableProps) {
  return (
    <>
      <table className="w-full *:[&_tr]:px-2 *:[&_tr]:py-2.5 [&_td]:border-b [&_td]:border-neutral-300 text-base">
        <thead className="*:text-left">
          <tr className="sticky top-32 z-20 bg-white border-b border-b-black">
            <th>Date submitted</th>
            <th>Votes</th>
            <th>Views</th>
            <th>Category</th>
            <th>Length</th>
            <th>UserID</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="hover:[&_tr]:bg-neutral-200 hover:[&_tr]:bg-opacity-70 ">
          {props.segments.map((x, index) => (
            <tr
              key={index}
              data-initial-fragment-request=""
              className={cn(
                x.shadowHidden || x.hidden || x.votes <= -2
                  ? "opacity-30 hover:opacity-100"
                  : undefined
              )}
            >
              <td>{new Date(x.timeSubmitted).toISOString()}</td>
              <td>
                <div className="inline-flex items-center gap-x-1">
                  <span>{x.votes}</span>
                  {x.locked ? (
                    <LuLock size={17} className="text-yellow-400" />
                  ) : null}
                </div>
              </td>
              <td>
                <div className="inline-flex items-center gap-x-1">
                  <span>{x.views}</span>
                  {x.shadowHidden ? (
                    <LuEyeOff size={17} className="text-red-500" />
                  ) : null}
                  {x.hidden ? (
                    <LuTimerOff size={17} className="text-red-500" />
                  ) : null}
                  {x.votes <= -2 ? (
                    <LuXCircle size={17} className="text-red-500" />
                  ) : null}
                </div>
              </td>
              <td>
                <SegmentBadge
                  segments={x.category as Category}
                  chapterLabel={x.description}
                />
              </td>
              <td>
                {x.actionType}
                {x.startTime}
                {x.endTime}
              </td>
              <td>{x.userID.slice(0, 8)}</td>
              <td>
                <button>
                  <LuMoreVertical size={19} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
