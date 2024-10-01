export type Segments =
  | "sponsor"
  | "selfpromo"
  | "intro"
  | "interaction"
  | "preview"
  | "poi_highlight"
  | "outro"
  | "filler"
  | "exclusive_access"
  | "music_offtopic"
  | "chapter"

export interface SBSegmentData {
  submittedDate: string
  submittedDateReadable: string
  segmentLabel: Segments
  segmentAction: string
  startTime: number
  endTime: number
  views: number
  votes: number
  isLocked: boolean
  isHidden: boolean
  isShadowHidden: boolean
  /**
   * Whether `votes` are less or equal than -2, `isHidden`, or `isShadowHidden` are true
   */
  hideSegment: boolean
  chapterLabel: string
  uuid: string
  userid: string
}

export type SBColDataConstants =
  | "submitted-date"
  | "username-userid"
  | "length"
  | "segment"
  | "votes"
  | "views"
