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

func (h *DepHandler) ChannelRoutes(e *echo.Echo) {
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
