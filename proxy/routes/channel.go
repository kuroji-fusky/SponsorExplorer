package routes

import (
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/kuroji-fusky/SponsorExplorer/proxy/youtube"
	"github.com/labstack/echo/v4"
)

type cachedChannelMeta struct {
	Name      string `json:"name"`
	Handle    string `json:"handle,omitempty"`
	ChannelId string `json:"id"`
	Avatar    string `json:"avatar"`

	Videos []cachedVideoMeta `json:"videos"`
}

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

func (h *DependencyHandler) ChannelRoutes(e *echo.Echo) {
	rdb := internal.NewRedisInstance(h.deps.Redis, h.deps.RedisCtx)
	yt := youtube.New(&youtube.YTOptions{ApiKey: h.deps.YTApiKey, Redis: rdb.RedisDB, RedisCtx: rdb.RedisContext})

	// Channel routes should always be the channel ID, not a handle or the username
	e.GET("/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")
		// isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		// isHandle := strings.HasPrefix(channelId, "@")

		channelResp := yt.Channel(channelId, nil).Items[0]
		channelSnippet := channelResp.Snippet

		channelUrlStrip := youtube.StripIdentifiers(channelResp.Id)

		playlistItemsResp := yt.PlaylistItems("UULF"+channelUrlStrip, nil)
		playlistItems := playlistItemsResp.Items

		longFormVideoIds := []string{}

		for _, vid := range playlistItems {
			longFormVideoIds = append(longFormVideoIds, vid.Snippet.ResourceId.VideoId)
		}

		videosWithTimestamps := yt.Video(strings.Join(longFormVideoIds, ","), nil)

		longFormVids := []cachedVideoMeta{}

		for _, vid := range videosWithTimestamps.Items {
			snippet := vid.Snippet

			longFormVids = append(longFormVids, cachedVideoMeta{
				ID: vid.Id,
				Details: videoMeta{
					VideoType:  VideoNormal,
					Title:      snippet.Title,
					Thumbnail:  strings.Split(snippet.Thumbnails.High.URL, "https:")[1],
					UploadDate: snippet.PublishedAt,
					Duration:   youtube.ParseYTDuration(vid.ContentDetails.Duration),
				},
			})
		}

		return c.JSON(http.StatusOK, cachedChannelMeta{
			Name:      channelSnippet.Title,
			Handle:    channelSnippet.CustomUrl,
			ChannelId: channelUrlStrip,
			Avatar:    channelSnippet.Thumbnails.Medium.URL,
			Videos:    longFormVids,
		})
	})

	// This endpoint updates the channel from cache
	e.PATCH("/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	// This endpoint deletes the channel from cache
	e.DELETE("/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.GET("/channel/:id/analysis", func(c echo.Context) error {
		channelId := c.Param("id")
		sampleSize, _ := strconv.Atoi(c.QueryParam("sample_size"))
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		// Temporary fix for unused variable
		log.Print(channelId, sampleSize, isBypassCache)

		return c.NoContent(http.StatusOK)
	})
}
