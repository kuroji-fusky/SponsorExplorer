export const pluralFormatter = (
  value: number,
  singularStr: string,
  pluralStr: string
) => {
  if (value === 1) return `${value} ${singularStr}`

  return `${value} ${pluralStr}`
}

export const formatNumber = (num: number) => num.toLocaleString("en-US")

export const formatTimecode = (num: number) => {}
