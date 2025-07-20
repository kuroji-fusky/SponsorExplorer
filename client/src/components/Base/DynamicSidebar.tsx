"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  LuChevronRight,
  LuChevronsRight,
  LuEllipsisVertical,
  LuHistory,
  LuListVideo,
  LuPencil,
  LuTrash,
} from "react-icons/lu"
import { IconWrapper } from "../IconWrapper"
import { KuroLS } from "@/lib/KuroLS"
import type { RecentVisitedChannels } from "@/types"
import { Notice } from "../Notice"

export function DynamicSidebar() {
  const [recentChannelList, setRecentChannelList] = useState<
    RecentVisitedChannels[]
  >([])

  const handleLSChanges = (e?: Event) => {
    setRecentChannelList(KuroLS.getItem("RecentVisitedChannels")!)
    console.log("LS Change", e)
  }

  useEffect(() => {
    handleLSChanges()

    window.addEventListener("kuro:storage", handleLSChanges)

    return () => {
      window.removeEventListener("kuro:storage", handleLSChanges)
    }
  }, [])

  const lmao = recentChannelList !== null ? recentChannelList.reverse() : []

  return (
    <>
      <aside className="w-[320px] xl:flex flex-col hidden shrink-0 fixed left-0 bottom-20 top-16 h-[calc(100dvh-4.15rem)] se-bg-w1 z-10">
        <nav className="px-3.5 py-2.5 border-b se-border-1 overflow-hidden flex">
          {/* Tabs */}
          <div className="overflow-x-auto overflow-y-hidden flex gap-x-1.5 flex-nowrap flex-1">
            <button className="py-2.5 px-1.5 border-b-2 inline-flex gap-x-1 items-center border-transparent">
              <span className="opacity-45">
                <IconWrapper icon={LuListVideo} size="smol" />
              </span>
              Playlist
            </button>
            <button className="py-2.5 px-1.5 border-b-2 inline-flex gap-x-1 items-center">
              <span className="opacity-100">
                <IconWrapper icon={LuHistory} size="smol" />
              </span>
              History
            </button>
          </div>
          {/* Expander */}
          <button>
            <IconWrapper icon={LuChevronsRight} />
          </button>
        </nav>
        <div className="pb-2.5 verflow-y-auto overflow-x-hidden">
          <section className="relative">
            {/* Header */}
            <div className="se-bg-w1 flex items-center px-5 sticky top-0 py-2.5">
              <button className="pl-1.5 pr-1">
                <IconWrapper icon={LuChevronRight} size="smol" />
              </button>
              <h2 className="flex-1 text-base">Recents</h2>
              <button className="px-1.5">
                <IconWrapper icon={LuPencil} size="smol" />
              </button>
              <button
                className="px-1.5"
                onClick={() => {
                  KuroLS.removeItem("RecentVisitedChannels")
                  setRecentChannelList([])
                }}
              >
                <IconWrapper icon={LuTrash} size="smol" />
              </button>
            </div>
            {/* Content */}
            <div className="select-none space-y-0.5" role="list">
              {/* <div className="px-4 pt-2">
                <Notice intent="warn">
                  Couldn't retrieve recent history because JavaScript is
                  disabled
                </Notice>
              </div>
              <div className="px-4 pt-2">
                <Notice intent="info">Tracking history is disabled</Notice>
              </div> */}
              {recentChannelList !== null
                ? lmao.map((item, i) => (
                    <div
                      key={i}
                      role="listitem"
                      className="text-left flex mx-3 rounded-md transition-colors duration-150  dark:hover:bg-neutral-800/75 hover:bg-neutral-200/50"
                    >
                      <Link
                        href={`/channel/${item.id}?source=history`}
                        className="px-2 py-2 flex-1 flex items-center gap-x-2"
                      >
                        <div className="size-[1.33rem] rounded-full bg-red-200"></div>
                        <span className="truncate">{item.name}</span>
                      </Link>
                      <span className="inline-flex items-center">
                        <button
                          className="h-full px-1.5"
                          onClick={() => console.log("HAYUP KA")}
                        >
                          <IconWrapper icon={LuEllipsisVertical} size="smol" />
                        </button>
                      </span>
                    </div>
                  ))
                : "lmao"}
            </div>
          </section>
        </div>
      </aside>
      {/* Anchor element */}
      <div className="w-[320px]" />
    </>
  )
}
