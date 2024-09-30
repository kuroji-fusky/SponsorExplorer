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

export const SB_BROWSER_URL = "https://sb.ltn.fi"

interface SBServersFrontend {
  title: string
  description: string
  endpoint: string
}

// Here's all the readily servers and database mirrors for SponsorBlock segments
// You can always add your own self-hosted servers on the frontend, no need for a PR :3
const availableSBMirrors: SBServersFrontend[] = [
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
