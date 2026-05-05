package routes

import "github.com/kuroji-fusky/SponsorExplorer/proxy/sponsorblock"

/**
 * SponsorBlock structs
 */

// [<total no. count>, <only hidden/downvote count>]
type NumberTuple struct{ TotalCount, WithIgnoredCount int }

type categoryRank struct {
	Category         sponsorblock.SegmentCategory `json:"category"`
	TotalSubmissions NumberTuple                  `json:"total_submissions"`
}

type categoryActionType struct {
	ActionType       sponsorblock.SegmentActionType `json:"action_type"`
	TotalSubmissions NumberTuple                    `json:"total_submissions"`
}

type videoDetails struct {
	videoMeta
	ChannelName   string `json:"channel_name"`
	ChannelId     string `json:"channel_id"`
	ChannelAvatar string `json:"avatar"`
}

/**
 * YouTube structs
 */

type VideoType string

const (
	VideoLive   VideoType = "live"
	VideoShorts VideoType = "shorts"
	VideoNormal VideoType = "uploads"
)

type cachedVideoMeta struct {
	ID       string                         `json:"id"`
	Details  videoMeta                      `json:"details"`
	Segments *[]sponsorblock.CachedSegments `json:"segments"`
}

type videoMeta struct {
	VideoType  VideoType                    `json:"_type"`
	Title      string                       `json:"title"`
	Thumbnail  string                       `json:"thumbnail"`
	UploadDate string                       `json:"uploadDate"`
	Duration   int64                        `json:"duration"`
	IsPremiere bool                         `json:"isPremiere"`
	Channel    *videoMetaWithChannelDetails `json:"channel,omitempty"`
}

type videoMetaWithChannelDetails struct {
	Name      string `json:"name"`
	Handle    string `json:"handle"`
	ChannelId string `json:"id"`
	Avatar    string `json:"avatar"`
}
