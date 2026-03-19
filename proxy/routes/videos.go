package routes

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/kuroji-fusky/SponsorExplorer/proxy/youtube"
	"github.com/labstack/echo/v4"
)

func (h *DepHandler) VideoRoutes(e *echo.Echo) {
	rdb := internal.NewRedisInstance(h.deps.Redis, h.deps.RedisCtx)
	yt := youtube.New(&youtube.YTOptions{ApiKey: h.deps.YTApiKey, Redis: rdb.RedisDB, RedisCtx: rdb.RCTX})

	e.GET("/yt/video/:id", func(c echo.Context) error {
		videoId := c.Param("id")

		if !internal.CheckValidYoutubeId(videoId) {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"_error": internal.YT_INVALID_VIDEO,
			})
		}

		start := time.Now()

		// TODO add a measure for private/deleted videos since they return nothing from their API
		videoResp := yt.Video(videoId, nil).Items[0]

		videoSnippet := videoResp.Snippet
		channelResp := yt.Channel(videoSnippet.ChannelId, nil).Items[0].Snippet

		elapsed := time.Since(start).Seconds()

		fmt.Printf("\n  -- v: %s\n  -- c: %s\n    > ts: %f\n", videoSnippet.Title, channelResp.Title, elapsed)

		header := c.Response().Header()
		header.Add("SEP-Cached", "MISS")

		isPremiere := !strings.Contains(videoSnippet.LiveBroadcastContent, "none")

		// Since public scheduled videos like Premiere and Upcoming livestreams, just set it to 0 as it undeterministic anyways
		var duration string = videoResp.ContentDetails.Duration
		if isPremiere {
			duration = "0"
		}

		return c.JSON(http.StatusOK, cachedVideoMeta{
			ID: videoId,
			Details: videoMeta{
				Title:      videoSnippet.Title,
				UploadDate: videoSnippet.PublishedAt,
				Thumbnail:  videoSnippet.Thumbnails.High.URL,
				Duration:   youtube.ParseYTDuration(duration),
				IsPremiere: isPremiere,
				VideoType:  VideoNormal,
				Channel: &videoMetaWithChannelDetails{
					Name:      videoSnippet.ChannelTitle,
					Handle:    channelResp.CustomUrl,
					ChannelId: youtube.StripIdentifiers(videoSnippet.ChannelId),
					Avatar:    channelResp.Thumbnails.Medium.URL,
				},
			},
		})
	})

	e.PATCH("/yt/video/:id", func(c echo.Context) error {
		videoId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(videoId)

		return c.JSON(http.StatusOK, cachedVideoMeta{})
	})

	e.DELETE("/yt/video/:id", func(c echo.Context) error {
		videoId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(videoId)

		return c.JSON(http.StatusOK, cachedVideoMeta{})
	})
}
