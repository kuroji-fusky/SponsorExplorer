import { Segments } from "@/types"
import { SegmentBadge } from "./badges"
import { LuEyeOff, LuLock, LuTimerOff, LuXCircle } from "react-icons/lu"

type SegmentTableProps = any

export function SegmentTable(props: SegmentTableProps) {
  return (
    <table className="w-full *:[&_tr]:px-2 *:[&_tr]:py-2.5 [&_td]:border-b [&_td]:border-neutral-300 text-base">
      <thead className="*:text-left">
        <tr>
          <th>Date submitted</th>
          <th>Votes</th>
          <th>Views</th>
          <th>Category</th>
          <th>Length</th>
          {/* <th>UserID</th> */}
          <th></th>
        </tr>
      </thead>
      <tbody className="hover:[&_tr]:bg-neutral-200 hover:[&_tr]:bg-opacity-70 ">
        {props.segments.map((x, index) => (
          <tr
            key={index}
            data-initial-fragment-request="0"
            className={
              x.shadowHidden || x.hidden || x.votes <= -2
                ? "opacity-30 hover:opacity-100"
                : undefined
            }
          >
            <td>{new Date(x.timeSubmitted).toISOString()}</td>
            <td>
              <div className="inline-flex items-center">
                <span>{x.votes}</span>
              </div>
            </td>
            <td>
              <div className="inline-flex items-center gap-x-1">
                <span>{x.views}</span>
                {!!x.locked && <LuLock size={17} />}
                {!!x.shadowHidden && (
                  <LuEyeOff size={17} className="text-red-500" />
                )}
                {!!x.hidden && (
                  <LuTimerOff size={17} className="text-red-500" />
                )}
                {!!(x.votes <= -2) && (
                  <LuXCircle size={17} className="text-red-500" />
                )}
              </div>
            </td>
            <td>
              <SegmentBadge
                segments={x.category as Segments}
                chapterLabel={x.description}
              />
            </td>
            <td>{x.startTime}</td>
            {/* <td>{x.userID}</td> */}
            <td>
              <button>Opt</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
