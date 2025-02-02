"use client"

import dynamic from "next/dynamic"
import type { SharedVideoItemProps } from "./VideoItem.types"

const VideoItemFullLabel = dynamic(
  () => import("./FullLabel").then((m) => m.VideoItemFullLabel),
  { ssr: false },
)

const SegmentBar = dynamic(
  () => import("../SegmentBar").then((m) => m.SegmentBar),
  { ssr: false },
)

export default function VideoItemCompact(props: SharedVideoItemProps) {
  return <></>
}
