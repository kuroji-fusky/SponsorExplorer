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

// func SkipCategories(videoId string) SkipSegmentResponse {
// 	return SkipCategoriesWithConfig(videoId, nil)
// }

func (sb *sponBlockSync) SkipCategories(videoId string, options *SkipAndSearchCategoriesConfig) SkipSegmentResponse {
	resp, _ := internal.Fetch(BASE_ENDPOINT + "/skipSegments" + "?videoID=" + videoId)

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
	resp, _ := internal.Fetch(BASE_ENDPOINT + "/searchSegments" + "?videoID=" + videoId)
	rdb := internal.NewRedisInstance(sb.RedisDB, sb.RCTX)

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
