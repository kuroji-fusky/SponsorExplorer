type DateFormat = Intl.DateTimeFormatOptions

export const DEFAULT_DATE_FORMAT = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23"
} satisfies DateFormat

export const parseDateStr = <DT extends string | number | Date = string>(dateStr: DT, format: DateFormat = DEFAULT_DATE_FORMAT) => {
  const d = new Date(dateStr)

  const isoDate = d.toISOString()

  const readableDate = d
    .toLocaleString("en-US", format)
  // .replace(", ", " ")
  // .replace(/\//g, "-")

  return { readableDate, isoDate }
}

export const pluralFormatter = (
  value: number,
  singularStr: string,
  pluralStr: string,
  options?: {
    noIncludeNum?: boolean
  }
) => {
  if (value === 1 && options?.noIncludeNum) return singularStr
  if (value === 1) return `${value} ${singularStr}`

  if (options?.noIncludeNum) return pluralStr
  return `${value} ${pluralStr}`
}

export const formatNumber = (num: number) => num.toLocaleString("en-US")

interface TimecodeOptions {
  separator: "colon" | "letters" | "sentence" // default: "colon"
  includeMilliseconds: boolean // default: false
  msRoundFactor: 1 | 2 | 3 | 4 | 5 // default: 2
  prefix: string
  suffix: string
}

export const formatTimecode = (
  time: number,
  options?: Partial<TimecodeOptions>
) => {
  const {
    separator = "colon",
    includeMilliseconds = false,
    msRoundFactor = 2,
    prefix = "",
    suffix = ""
  } = options || {}

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)
  const milliseconds = (time % 1).toFixed(msRoundFactor).substring(2)

  let timeString: string

  const minStr = minutes.toString().padStart(2, "0")
  const secStr = seconds.toString().padStart(2, "0")

  if (separator === "colon") {
    timeString =
      hours > 0 ? `${hours}:${minStr}:${secStr}` : `${minutes}:${secStr}`
    if (includeMilliseconds) {
      timeString += `.${milliseconds}`
    }
  } else if (separator === "letters") {
    timeString =
      hours > 0
        ? `${hours}h ${minutes}m ${seconds}s`
        : `${minutes}m ${seconds}s`
  } else {
    timeString =
      hours > 0
        ? `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}, ${seconds} second${seconds !== 1 ? "s" : ""}`
        : `${minutes} minute${minutes !== 1 ? "s" : ""}, ${seconds} second${seconds !== 1 ? "s" : ""}`
  }

  if (includeMilliseconds && separator !== "colon") {
    // milliseconds are ignored for non-colon separators
    timeString = timeString.replace(/m [0-5][0-9]s$/, `${minutes}m`)
    timeString = timeString.replace(
      /minutes, [0-5][0-9] seconds$/,
      `${minutes} minutes`
    )
  }

  if (prefix) {
    timeString = `${prefix.trim()} ${timeString}`
  }

  if (suffix) {
    timeString = `${timeString} ${suffix.trim()}`
  }

  return timeString.trim()
}


export const formatYTTimecode = (time: string) => {
  const match = time.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  if (!match) return '0:00'

  /* eslint-disable-next-line no-unused-vars */
  const [_, h, m, s] = match

  const _int = (n: string) => n ? parseInt(n, 10) : 0

  const hours = _int(h)
  const minutes = _int(m)
  const seconds = _int(s)

  const _pad = (num: number) => num.toString().padStart(2, "0")
  const padMinute = _pad(minutes)
  const padSecond = _pad(seconds)

  return hours ? `${hours}:${padMinute}:${padSecond}` : `${minutes}:${padSecond}`
}

export const calcDateDiff = (d1: string, d2: string) => {
  const _d1 = new Date(d1)
  const _d2 = new Date(d2)

  const diff = Math.abs(_d1.valueOf() - _d2.valueOf()) / 1000

  // const days = Math.floor(diff / 86400)
  // const hours = Math.floor(diff / 3600) % 24
  // const minutes = Math.floor(diff / 60) % 60
  const seconds = Math.floor(diff)

  return seconds
}
