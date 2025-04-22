import { parseDateStr } from "@/utils"

interface TimeDateWrapperProps {
  date: string
  dateOpts?: Intl.DateTimeFormatOptions
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

  return <time dateTime={isoDate}>{readableDate}</time>
}
