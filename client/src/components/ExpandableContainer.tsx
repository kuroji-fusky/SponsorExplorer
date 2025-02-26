"use client"

import { cn } from "@/utils"

interface ExpandableContentProps {
  isOpen?: boolean
  className?: string
  hasSeparator?: true
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
      <div
        className={cn(
          "overflow-hidden",
          props.hasSeparator ? "transition-[padding]" : "",
          props.hasSeparator && props.isOpen ? "pb-1" : "",
        )}
      >
        {props.hasSeparator ? (
          <div className="my-2 border-t border-t-white/50 dark:border-t-neutral-400/50" />
        ) : null}
        {props.children}
      </div>
    </div>
  )
}
