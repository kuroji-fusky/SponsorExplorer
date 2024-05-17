export const parseDateStr = (dateStr: string) => {
  const d = new Date(dateStr)

  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  } satisfies Intl.DateTimeFormatOptions

  const isoDate = d.toISOString()

  const readableDate = d
    .toLocaleString("en-US", options)
    .replace(", ", " ")
    .replace(/\//g, "-")

  return { readableDate, isoDate }
}
