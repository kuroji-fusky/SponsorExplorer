import { cn } from "@/utils"
import type { IconType } from "react-icons"

interface IconHandlerProps {
  icon: IconType
  size?: "smol" | "normal" | "beeg"
}

export function IconWrapper(props: IconHandlerProps) {
  const IconComponent = props.icon

  const sizes = {
    smol: "size-[1.15rem]",
    normal: "size-[1.19rem]",
    beeg: "size-[1.24rem]",
  }

  return (
    <IconComponent
      data-icon-wrapper=""
      className={cn(sizes[props.size ?? "normal"])}
    />
  )
}
