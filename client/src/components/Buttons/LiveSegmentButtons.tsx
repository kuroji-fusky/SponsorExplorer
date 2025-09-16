"use client"

import { LuChevronDown, LuPlay, LuRefreshCw } from "react-icons/lu"
import { Button } from "./Button"
import { ButtonMerge } from "./ButtonMerge"
import { IconWrapper } from "../IconWrapper"

export function LiveSegmentButtons() {
  return (
    <>
      <ButtonMerge>
        <Button prefixIcon={LuRefreshCw}>
          <span className="hidden md:block">Refresh</span>
        </Button>
        <Button iconOnly className="hidden md:block">
          <IconWrapper icon={LuChevronDown} />
        </Button>
      </ButtonMerge>
    </>
  )
}
