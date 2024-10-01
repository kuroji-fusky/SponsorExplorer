export type Category =
  | "sponsor"
  | "selfpromo"
  | "interaction"
  | "intro"
  | "outro"
  | "music_offtopic"

export type ActionType = "skip" | "full" | "mute" | "chapter"

export namespace Props {
  export interface SkipAndSearchSegments {
    videoID: string
    categories?: Category[]
    actionTypes?: ActionType[]
    page?: number
    service?: "YouTube"
    minVotes?: number
    maxVotes?: number
    minViews?: number
    maxViews?: number
    locked?: boolean
    hidden?: boolean
    ignored?: boolean
  }

  export interface LockedSegments {
    videoID: string
    actionTypes?: ActionType[]
  }

  export interface UserID {
    userName: string
    exact?: boolean
  }

  export interface UserInfo {
    userID: string
    publicUserID: string
    values?: string[]
  }
}

export namespace Responses {}
