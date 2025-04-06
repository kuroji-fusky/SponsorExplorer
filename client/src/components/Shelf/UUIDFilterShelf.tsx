"use client"

import {
  LuSearch,
  LuChevronDown,
  LuPlay,
  LuRefreshCw,
} from "react-icons/lu"
import { Button, ButtonMerge, MoreButton } from "../Buttons"
import { IconWrapper } from "../IconWrapper"

export function UUIDFilterShelf() {
  return (
    <div className="flex justify-between items-center gap-x-1.5">
      <div className="relative flex-1 h-full">
        <span className="absolute inset-y-0 left-0 inline-flex items-center ml-2.5 pointer-events-none">
          <IconWrapper icon={LuSearch} />
        </span>
        <input
          className="w-full h-full py-2 pr-2 border rounded-md dark:bg-neutral-950 pl-9 dark:border-neutral-700"
          type="search"
          name="search-uuid"
          id="sv"
          placeholder="Filter N results..."
        />
      </div>
      <div className="flex gap-x-1.5">
        <Button suffixIcon={LuChevronDown} className="w-48">
          <span className="italic opacity-60">No group</span>
        </Button>
        <ButtonMerge>
          <Button prefixIcon={LuPlay}>Live</Button>
          <Button iconOnly>
            <IconWrapper icon={LuChevronDown} />
          </Button>
        </ButtonMerge>
        <Button iconOnly>
          <IconWrapper icon={LuRefreshCw} />
        </Button>
        <MoreButton />
      </div>
    </div>
  )
}
