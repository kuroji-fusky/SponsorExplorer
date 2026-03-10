package routes

import (
	"log"
	"net/http"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/youtube"
	"github.com/labstack/echo/v4"
)

func (h *DepHandler) VideoRoutes(e *echo.Echo) {
	ytToken := h.deps.YTApiKey
	// cacheDb := h.deps.Redis
	yt := youtube.New(&youtube.YTOptions{ApiKey: ytToken})

	e.GET("/yt/video/:id", func(c echo.Context) error {

		videoId := c.Param("id")

		if len(videoId) != 11 {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"_error": "YouTube video IDs are exactly 11 characters long. Did you make sure it's the correct ID and not a typo?",
			})
		}

		// Kinda ridiculous that you'd call two APIs just to get the handle of a given channel
		videoResp := yt.Video(videoId).Items[0]

		videoSnippet := videoResp.Snippet
		channelResp := yt.Channel(videoSnippet.ChannelId).Items[0].Snippet

		return c.JSON(http.StatusOK, cachedVideoMeta{
			ID: videoId,
			Details: videoMeta{
				Title:      videoSnippet.Title,
				UploadDate: videoSnippet.PublishedAt,
				Thumbnail:  videoSnippet.Thumbnails.High.URL,
				Duration:   videoResp.ContentDetails.Duration,
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

	e.POST("/yt/video/:id", func(c echo.Context) error {
		videoId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(videoId)

		return c.JSON(http.StatusOK, cachedVideoMeta{})
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
