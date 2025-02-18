"use client"

import { cn } from "@/utils"

interface ExpandableContentProps {
  isOpen?: boolean
  className?: string
}

export function ExpandableContainer(
  props: React.PropsWithChildren<ExpandableContentProps>,
) {
  return (
    <div
      data-expandable-container=""
      className={cn("transition-all mx-1.5 grid", props.className)}
      style={{ gridTemplateRows: props.isOpen ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">{props.children}</div>
    </div>
  )
}
