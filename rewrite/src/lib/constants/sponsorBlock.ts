interface SB_FrontendModel {
  label: string
  helpLink?: string
}

export const CATEGORY_MAP = {
  chapter: { label: "Chapter" },
  poi_highlight: { label: "Highlight" },
  sponsor: { label: "Sponsor" },
  selfpromo: { label: "Unpaid/Self Promotion" },
  preview: { label: "Preview/Recap" },
  interaction: { label: "Interaction Reminder" },
  intro: { label: "Intro/Intermission" },
  outro: { label: "Endcards/Credits" },
  filler: { label: "Tangents/Jokes" },
  hook: { label: "Hook/Greetings" },
  music_offtopic: { label: "Non-Music Section" },
  exclusive_access: { label: "Exclusive Access" },
} as const satisfies Record<string, SB_FrontendModel>

export const ACTIONTYPE_MAP = {
  skip: { label: "Skip" },
  mute: { label: "Mute" },
  poi_highlight: { label: "Highlight" },
  chapter: { label: "Chapter" },
} as const satisfies Record<string, SB_FrontendModel>

export type ActionType = keyof typeof ACTIONTYPE_MAP
export type Category = keyof typeof CATEGORY_MAP

export const AllCategories = Object.keys(CATEGORY_MAP) as Category[]
export const AllActionTypes = Object.keys(ACTIONTYPE_MAP) as ActionType[]

// wip - will use the proxy API instead of the SponsorBlock API
export interface SegmentMeta {
  videoID: string
  categories?: Category[]
  actionTypes?: ActionType[]
  chapterName?: string
  page?: number
  service?: "YouTube"
  segment?: [number, number]
  minVotes?: number
  maxVotes?: number
  minViews?: number
  maxViews?: number
  views?: number
  votes?: number
  locked?: boolean
  /** responds as `shadowHidden` */
  hidden?: boolean
  ignored?: boolean
}
type _OmitFilters = "minVotes" | "maxVotes" | "minViews" | "maxViews"

export interface UserInfoMeta {
  userID: string
  publicUserID: string
  values?: string[]
}
