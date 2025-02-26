import { LuEllipsisVertical } from "react-icons/lu"
import { Button } from "./Button"
import type { SharedButtonProps } from "./Button.types"
import { IconWrapper } from "../IconWrapper"

export function MoreButton(props: SharedButtonProps) {
  return (
    <Button size={props.size} iconOnly>
      <IconWrapper icon={LuEllipsisVertical} />
    </Button>
  )
}
