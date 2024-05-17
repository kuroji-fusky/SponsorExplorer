import { twMerge } from "tailwind-merge"

export const cn = (...className: string[]) => {
  return twMerge(className.filter(Boolean).join(" "))
}
