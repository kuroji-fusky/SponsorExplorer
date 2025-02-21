import { cn } from "@/utils"
import { kebabCase } from "lodash-es"
import type { IconType } from "react-icons"

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
      {props.tabs.map((item) => {
        const uniqueLabelId = `${kebabCase(item.label)}-${crypto.randomUUID()}`
        const isActive = item.label === props.activeTab
        const Icon = item.icon

        return (
          <button
            key={uniqueLabelId}
            aria-labelledby={uniqueLabelId}
            aria-current={isActive ? true : undefined}
            className={cn(
              "rounded-md xl:px-2.5 px-2 py-1 font-medium inline-flex items-center gap-x-1.5",
              isActive ? "bg-neutral-300 dark:bg-neutral-800" : null,
            )}
          >
            {Icon ? <Icon size={18} /> : null}
            <span id={uniqueLabelId}>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
