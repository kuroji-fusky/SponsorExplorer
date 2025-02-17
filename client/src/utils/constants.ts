import type { RequestInit } from "next/dist/server/web/spec-extension/request"

export const SB_FETCH_OPTIONS = {
  cache: "no-cache",
  next: {
    revalidate: 60 * 3 // 3 min
  }
} satisfies RequestInit

// Landing
export const randomChannelsLanding = [
  "MrBeast",
  "LinusTechTips",
  "JerryRigEverything",
  "GameTheory",
  "mkbhd",
  "JaidenAnimations",
  "MarkRober",
  "Mrwhosetheboss",
  "NetworkChuck",
  "techlinked",
  "ComputerClan",
  "kurzgesagt",
  "smosh",
]

interface SBServersFrontend {
  title: string
  description: string
  endpoint: string
}

const sbMirrors: SBServersFrontend[] = [
  {
    title: "mchang.xyz database mirror",
    description: "[5min delay] A mirror archive of all the segments provided by mchangrh",
    endpoint: "mirror.sb.mchang.xyz",
  },
  {
    title: "mchang.xyz database mirror archive",
    description: "[24hr delay] A mirror archive of all the segments provided by mchangrh",
    endpoint: "archive.sb.mchang.xyz",
  },
  {
    title: "Kavin mirror",
    description: "5 min delay",
    endpoint: "sponsorblock.kavin.rocks",
  },
]
