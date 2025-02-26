import { IconType } from "react-icons"

export interface SharedButtonProps {
  iconOnly?: boolean
  prefixIcon?: IconType
  suffixIcon?: IconType
  size?: "smol" | "normal"
  borderless?: true
}
