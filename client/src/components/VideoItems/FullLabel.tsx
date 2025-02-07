"use client"

import { cn, mapCategory } from "@/utils"
import type { Category } from "@/utils/SponsorBlock.types"

interface VideoItemFullLabelProps {
  label: Category & string
}

export function VideoItemFullLabel(props: VideoItemFullLabelProps) {
  const { label, bg } = mapCategory(props.label)

  return (
    <div className="font-semibold relative px-2">
      <span
        className={cn(
          "relative z-20",
          props.label !== "selfpromo" ? "text-white" : null,
        )}
      >
        {label}
      </span>
      <span className="bg-black/10 dark:bg-black/30 absolute z-10 inset-0" />
      <span className={cn(bg, "absolute inset-0")} />
    </div>
  )
}
