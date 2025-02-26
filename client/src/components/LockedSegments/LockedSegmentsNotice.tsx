import { cn } from "@/utils"
import { LuChevronRight, LuCircleHelp, LuLock } from "react-icons/lu"
import { useState } from "react"
import { ExpandableContainer } from "../ExpandableContainer"

interface LockedSegmentsNoticeProps {
  reason: string | null
}

export function LockedSegmentsNotice(props: LockedSegmentsNoticeProps) {
  const [revealSegments, setRevealSegments] = useState(false)

  return (
    <div
      role="group"
      className="border-2 border-red-400 bg-red-100/30 dark:border-red-600 dark:bg-red-900/30 pl-2 pr-3.5 py-2.5 rounded-md text-left w-full block"
    >
      <div className="flex items-center">
        <button
          className=" mr-1 opacity-75"
          onClick={() => setRevealSegments(!revealSegments)}
        >
          <LuChevronRight
            size={19}
            className={cn(
              "flex-shrink-0 transition-transform",
              revealSegments ? "rotate-90" : undefined,
            )}
          />
        </button>
        <LuLock size={20} className="flex-shrink-0" />
        <article className="ml-2.5">
          <span className="inline-flex gap-x-1.5">
            <h2 className="font-semibold text-base">
              Categories for this video have been locked
            </h2>
            <button>
              <LuCircleHelp size={16} />
            </button>
          </span>
          <p className={cn("mt-0.5", !props.reason && "italic opacity-65")}>
            <div>
              {props.reason ? (
                <div
                  className={cn(
                    revealSegments
                      ? "line-clamp-none"
                      : "line-clamp-1 lg:line-clamp-none break-all lg:break-normal",
                  )}
                >
                  <span className="font-bold">{"Reason: "}</span>
                  {props.reason}
                </div>
              ) : (
                "No reason provided."
              )}
            </div>
          </p>
        </article>
      </div>
      <ExpandableContainer isOpen={revealSegments} hasSeparator>
        <div>WIP</div>
      </ExpandableContainer>
    </div>
  )
}
