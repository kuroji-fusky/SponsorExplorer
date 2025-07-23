import { cva, type VariantProps } from "class-variance-authority"
import { type PropsWithChildren, useId } from "react"
import {
  LuInfo as InfoIcon,
  LuTriangleAlert as WarningIcon,
  LuCircleX as AlertIcon,
} from "react-icons/lu"

const NoticeBox = cva(
  "text-black dark:text-white flex items-center gap-x-2.5 rounded-md px-3.5 py-2.5",
  {
    variants: {
      intent: {
        info: "bg-blue-100 dark:bg-blue-800/30",
        warn: "bg-yellow-100 dark:bg-yellow-800/30",
        alert: "bg-red-100 dark:bg-red-800/30",
      },
    },
    compoundVariants: [
      {
        intent: "info",
      },
    ],
  },
)

interface NoticeProps {
  heading?: string
}

export function Notice(
  props: PropsWithChildren<NoticeProps & VariantProps<typeof NoticeBox>>,
) {
  const a11yHeadingId = `notice-title-${useId()}`

  const iconProps = {
    size: 24,
    className: "flex-shrink-0",
  }

  return (
    <div
      data-testid="notice-box"
      className={NoticeBox({
        intent: props.intent,
      })}
      role="note"
      aria-labelledby={props.heading ? a11yHeadingId : undefined}
    >
      {props.intent === "info" && <InfoIcon {...iconProps} />}
      {props.intent === "warn" && <WarningIcon {...iconProps} />}
      {props.intent === "alert" && <AlertIcon {...iconProps} />}
      <div>
        {props.heading ? (
          <div className="font-semibold text-lg pb-0.5" id={a11yHeadingId}>
            {props.heading}
          </div>
        ) : null}
        <span>{props.children}</span>
      </div>
    </div>
  )
}
