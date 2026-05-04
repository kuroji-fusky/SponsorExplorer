export const parsedDate = (date: Date | string) => {
  const sanitizedDate = date instanceof Date ? date : new Date(date)

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric"
  } satisfies Intl.DateTimeFormatOptions

  return {
    iso: sanitizedDate.toISOString(),
    readable: new Intl.DateTimeFormat("en-US", options).format(sanitizedDate)
  }
}
