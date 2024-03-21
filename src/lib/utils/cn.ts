export const cn = (...className: string[]) => {
  return className.filter(Boolean).join(" ")
}
