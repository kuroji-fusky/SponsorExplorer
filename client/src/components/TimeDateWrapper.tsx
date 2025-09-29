import { parseDateStr } from "@/utils"

interface TimeDateWrapperProps {
  date: string
  dateOpts?: Intl.DateTimeFormatOptions
  className?: string
}

export function TimeDateWrapper(props: TimeDateWrapperProps) {
  const { isoDate, readableDate } = parseDateStr(
    props.date,
    props.dateOpts ?? {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  )

  return (
    <time
      data-td-wrapper=""
      title={isoDate}
      dateTime={isoDate}
      className={props.className}
    >
      {readableDate}
    </time>
  )
}
