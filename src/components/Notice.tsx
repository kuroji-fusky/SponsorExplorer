import { cva, type VariantProps } from "class-variance-authority"
import { PropsWithChildren } from "react"

const noticeEl = cva("flex items-center gap-x-2.5 rounded-md px-3.5 py-2.5", {
  variants: {
    intent: {
      info: "bg-blue-950",
      warn: "bg-yellow-950",
      alert: "bg-red-950",
    },
  },
  compoundVariants: [
    {
      intent: "info",
    },
  ],
})

interface NoticeProps {
  heading?: string
}

export function Notice(
  props: PropsWithChildren<NoticeProps & VariantProps<typeof noticeEl>>
) {
  return (
    <div
      className={noticeEl({
        intent: props.intent,
      })}
    >
      {/* {#if intent === "info"}
    <InfoIcon {...iconProps} />
  {:else if intent === "warn"}
    <WarningIcon {...iconProps} />
  {:else}
    <AlertIcon {...iconProps} />
  {/if} */}
      <div>
        <div className="font-bold text-lg pb-0.5">{props.heading}</div>
        <span>{props.children}</span>
      </div>
    </div>
  )
}
