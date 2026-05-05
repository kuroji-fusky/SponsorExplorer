package sponsorblock

// There's a weird edge case where Content-Type returns `text/plain` if there are no data,
// but returns `application/json` if there is - this is one of the reasons why
// I created a proxy API in the first place to mitigate this annoying mess lol

import (
	"fmt"
	"time"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
)

// func fallbackToPlaintext[T any](resp *internal.HttpFetchResponse, v any) {
// 	if err := resp.JSON(&v); err != nil {
// 		// Instead of panicking, just wrap the plaintext response as error
// 		v = T{
// 			withErrorWrapper: withErrorWrapper{
// 				Errors: resp.Plaintext(),
// 			},
// 		}
// 	}
// }

type SegmentCategory string
type SegmentActionType string

const (
	CategoryTangents    SegmentCategory = "Tangents/Jokes"
	CategorySponsor     SegmentCategory = "Sponsor"
	CategorySelfpromo   SegmentCategory = "Unpaid/Self Promotion"
	CategoryIntro       SegmentCategory = "Intro/Intermission"
	CategoryOutro       SegmentCategory = "Endcards/Credits"
	CategoryNonMusic    SegmentCategory = "Non-Music"
	CategoryPreview     SegmentCategory = "Preview/Recap"
	CategoryHook        SegmentCategory = "Hook/Greetings"
	CategoryInteraction SegmentCategory = "Interaction Reminder"
	CategoryHighlight   SegmentCategory = "Highlight"
	CategoryChapter     SegmentCategory = "Chapter"
)

const (
	ActionSkip      SegmentActionType = "skip"
	ActionFull      SegmentActionType = "full"
	ActionMute      SegmentActionType = "mute"
	ActionHighlight SegmentActionType = "highlight"
)

type withErrorWrapper struct {
	Errors string `json:"_error,omitempty"`
}

type segmentLength struct {
	Start, End float64
}

type CachedSegments struct {
	VideoID        string            `json:"videoId,omitempty"` // A redundant property when fetching the video endpoint and won't be included unless you're fetching this from a channel endpoint
	Date           string            `json:"date_submitted"`
	UUID           string            `json:"uuid"`
	Length         segmentLength     `json:"length"`          // Returns [0.000, 1.234]
	LengthReadable string            `json:"length_readable"` // Returns HH:MM:SS formrat
	Category       SegmentCategory   `json:"category"`
	ActionType     SegmentActionType `json:"action_type"`
	Shadowhidden   bool              `json:"is_shadowhidden"`
	Hidden         bool              `json:"is_hidden"`
	UserID         string            `json:"userID"`
	Username       string            `json:"username,omitempty"`
}

var AllSegments = []SegmentCategory{
	CategoryTangents,
	CategorySponsor,
	CategorySelfpromo,
	CategoryIntro,
	CategoryOutro,
	CategoryNonMusic,
	CategoryPreview,
	CategoryHook,
	CategoryInteraction,
	CategoryHighlight,
	CategoryChapter,
}

var AllActionTypes = []SegmentActionType{
	ActionFull,
	ActionHighlight,
	ActionMute,
	ActionSkip,
}

// Config for `skipSegments` and `searchSegments`
//
// Note: URL param `?service=YouTube` is omitted since it appends them automatically
type SkipAndSearchCategoriesConfig struct {
	Categories []SegmentCategory   `query:"category,omitempty"`
	ActionType []SegmentActionType `query:"actionType,omitempty"`
	Page       int                 `query:"number,omitempty"`
	MinVotes   int                 `query:"minVotes,omitempty"`
	MaxVotes   int                 `query:"maxVotes,omitempty"`
	MinViews   int                 `query:"minViews,omitempty"`
	MaxViews   int                 `query:"maxViews,omitempty"`
	Hidden     bool                `query:"hidden,omitempty"`
	Ignored    bool                `query:"ignored,omitempty"`
}

type skipSegmentResponse struct {
	Segment       segmentLength     `json:"segment"`
	UUID          string            `json:"uuid"`
	Category      SegmentCategory   `json:"category"`
	VideoDuration float64           `json:"videoDuration"`
	ActionType    SegmentActionType `json:"action_type"`
	Locked        int               `json:"locked"`
	Votes         int               `json:"votes"`
	Description   string            `json:"description"`
}

type SkipSegmentResponse struct {
	Data []skipSegmentResponse `json:"data"`
	withErrorWrapper
}

func (sb *sponBlockSync) SkipCategories(videoId string, options *SkipAndSearchCategoriesConfig) SkipSegmentResponse {
	params := SkipAndSearchCategoriesConfig{}
	if options != nil {
		params = *options
	}

	resp, _ := internal.Fetch(internal.BuildURLWithQuery(BASE_ENDPOINT+"/skipSegments", struct {
		SkipAndSearchCategoriesConfig
		VideoID string `query:"videoID"`
	}{
		SkipAndSearchCategoriesConfig: params,
		VideoID:                       videoId,
	}))

	var skipSegmentsRes SkipSegmentResponse

	if err := resp.JSON(&skipSegmentsRes); err != nil {
		// Instead of panicking, just wrap the plaintext response as error
		skipSegmentsRes = SkipSegmentResponse{
			withErrorWrapper: withErrorWrapper{
				Errors: resp.Plaintext(),
			},
		}
	}

	return skipSegmentsRes
}

type SearchCategoriesResponse struct {
	SegmentCount int `json:"segmentCount"`
	Page         int `json:"page"`
	Segments     []struct {
		UUID          string            `json:"uuid"`
		TimeSubmitted int               `json:"timeSubmitted"`
		StartTime     int               `json:"startTime"`
		EndTime       int               `json:"endTime"`
		Category      SegmentCategory   `json:"category"`
		ActionType    SegmentActionType `json:"actionType"`
		Votes         int               `json:"votes"`
		Views         int               `json:"views"`
		Hidden        int               `json:"hidden"`
		ShadowHidden  int               `json:"shadowHidden"`
		UserID        string            `json:"userID"`
		Description   string            `json:"description"`
	} `json:"segments"`
	withErrorWrapper
}

func (sb *sponBlockSync) SearchCategories(videoId string, options *SkipAndSearchCategoriesConfig) SearchCategoriesResponse {
	rdb := internal.NewRedisInstance(sb.RedisDB, sb.RedisContext)

	params := SkipAndSearchCategoriesConfig{}
	if options != nil {
		params = *options
	}

	resp, _ := internal.Fetch(internal.BuildURLWithQuery(BASE_ENDPOINT+"/searchSegments", struct {
		SkipAndSearchCategoriesConfig
		VideoID string `query:"videoID"`
	}{
		SkipAndSearchCategoriesConfig: params,
		VideoID:                       videoId,
	}))

	start := time.Now()

	var searchSegmentsRes SearchCategoriesResponse

	if err := resp.JSON(&searchSegmentsRes); err != nil {
		// Instead of panicking, just wrap the plaintext response as error
		// searchSegmentsRes = SearchCategoriesResponse{
		// 	withErrorWrapper: withErrorWrapper{
		// 		Errors: resp.Plaintext(),
		// 	},
		// }
	}

	fmt.Println(resp.ContentType)

	elapsed := time.Since(start).Seconds()

	rdb.AddEventLog(internal.NetworkLog{
		RequestTime: elapsed,
		Url:         resp.URL,
		Type:        "raw dog me baby",
	})

	return searchSegmentsRes
}
