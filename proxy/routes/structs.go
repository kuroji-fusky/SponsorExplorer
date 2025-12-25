package routes

import "github.com/kuroji-fusky/SponsorExplorer/proxy/sponsorblock"

type baseVideoMeta struct {
	VideoId   string `json:"id"`
	Duration  string `json:"duration"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

type cachedChannelMeta struct {
	Name      string                         `json:"name"`
	Handle    string                         `json:"forHandle,omitempty"`
	ChannelId string                         `json:"id"`
	Videos    []cachedVideoMeta              `json:"videos"`
	Segments  *[]sponsorblock.CachedSegments `json:"segments"`
}

type cachedVideoMeta struct {
	baseVideoMeta
	UploadDate string                         `json:"uploadDate"`
	Segments   *[]sponsorblock.CachedSegments `json:"segments"`
}

// ANALYSIS
//

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
	baseVideoMeta
	ChannelName   string `json:"channel_name"`
	ChannelId     string `json:"channel_id"`
	ChannelAvatar string `json:"avatar"`
}

// For `/channel/{id}/analysis`
type channelSegmentAnalysis struct {
	VideoDetails videoDetails `json:"video"`
	Stats        struct {
		Submissions []struct {
			Total       int `json:"total"`
			UserRanking []struct {
				Username         *string        `json:"username"` // Sometimes, a sponblock user would have no name and would normally be assigned by their public userID
				UserID           string         `json:"user_id"`
				TotalSubmissions NumberTuple    `json:"total_submissions"`
				TotalViews       int            `json:"total_views"`
				TotalVotes       int            `json:"total_votes"`
				CategoryRanking  []categoryRank `json:"category_ranks"` // No "actiontype_ranks" since it would be redundant
			} `json:"ranking"`
		} `json:"submissions"`
		Categories []struct {
			TotalSegments     int                  `json:"total_segments"`
			CategoryRanking   []categoryRank       `json:"category_ranks"`
			ActionTypeRanking []categoryActionType `json:"actiontype_ranks"`
		} `json:"categories"`

		// This refers to the total videos fetched from the YT API, maximum is 50
		// It's calculated based on the total videos fetched divided by the total video uploads from a channel
		SampleRelativeTotal float32 `json:"sample_relative_total"`
	} `json:"stats"`
}

// For `/sb/user/{username/uuid}/analysis`
type usernameSubmissionAnalysis struct {
	Username         string `json:"username"`
	UserID           string `json:"user_id"`
	TotalSubmissions int    `json:"total_submissions"`
	Ranks            struct {
		CategoryRanking   []categoryRank       `json:"category"`
		ActionTypeRanking []categoryActionType `json:"actiontype"`
	} `json:"ranks"`
	Stats struct {
		Videos []struct {
			videoDetails
			SegmentsSubmitted int `json:"segments_submitted"`
		} `json:"videos"`
		Channels []struct {
			Name              string `json:"name"`
			Avatar            string `json:"avatar"`
			Id                string `json:"id"`
			SegmentsSubmitted int    `json:"segments_submitted"`
		} `json:"channels"`
	} `json:"stats"`
}
