import type { GetAPIResponseType, VideoSegments } from "@/types"
import type { GET as _YTChannelRes } from "@/app/api/yt/channel/route"

type YTChannelResponse = GetAPIResponseType<typeof _YTChannelRes>
type YTChannelVideos = Omit<YTChannelResponse["videos"][number], "thumbnail">
export interface SharedVideoItemProps extends YTChannelVideos {
  segmentDisplay?: VideoSegments["segments"]
  thumbnail?: string
  date?: string
}
