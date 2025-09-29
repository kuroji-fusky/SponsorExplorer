"use client"

import { cn } from "@/utils"
import { kebabCase } from "lodash-es"
import type { IconType } from "react-icons"
import { IconWrapper } from "./IconWrapper"

type TabLabelConstraint = {
  label: string
  icon?: IconType
}

type RetrieveMappedValues<
  T extends readonly any[],
  K extends keyof T[number],
> = T[number][K]

type TabProps<T extends TabLabelConstraint[]> = {
  iconOnly?: true
  tabs: T
  activeTab: RetrieveMappedValues<T, "label">
}

export function Tabs<T extends TabLabelConstraint[]>(props: TabProps<T>) {
  return (
    <div className="rounded-md border flex p-1 se-border-1">
      {props.tabs.map((item, index) => {
        const uniqueLabelId = `${kebabCase(item.label)}-${index}`
        const isActive = item.label === props.activeTab
        const Icon = item.icon

        return (
          <button
            key={uniqueLabelId}
            aria-labelledby={!props.iconOnly ? uniqueLabelId : undefined}
            aria-label={props.iconOnly ? item.label : undefined}
            aria-current={isActive ? true : undefined}
            className={cn(
              "rounded-md font-medium inline-flex items-center gap-x-1.5",
              props.iconOnly ? "px-1.5 py-1" : "xl:px-2.5 px-2 py-1",
              isActive ? "bg-neutral-300 dark:bg-neutral-800" : null,
            )}
          >
            {Icon ? <IconWrapper icon={Icon} size="smol" /> : null}
            {!props.iconOnly ? (
              <span id={uniqueLabelId}>{item.label}</span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
