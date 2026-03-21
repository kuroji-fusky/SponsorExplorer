package routes

import "github.com/kuroji-fusky/SponsorExplorer/proxy/sponsorblock"

// CHANNEL
//

type cachedChannelMeta struct {
	Name      string `json:"name"`
	Handle    string `json:"handle,omitempty"`
	ChannelId string `json:"id"`
	Avatar    string `json:"avatar"`

	Videos []cachedVideoMeta `json:"videos"`
}

// VIDEO
//

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
