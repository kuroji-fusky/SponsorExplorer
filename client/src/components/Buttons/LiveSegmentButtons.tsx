"use client"

import { LuChevronDown, LuPlay, LuRefreshCw } from "react-icons/lu"
import { Button } from "./Button"
import { ButtonMerge } from "./ButtonMerge"
import { IconWrapper } from "../IconWrapper"

export function LiveSegmentButtons() {
  return (
    <>
      <ButtonMerge>
        <Button prefixIcon={LuPlay}>Live</Button>
        <Button iconOnly>
          <IconWrapper icon={LuChevronDown} />
        </Button>
      </ButtonMerge>
      <Button iconOnly>
        <IconWrapper icon={LuRefreshCw} />
      </Button>
    </>
  )
}
