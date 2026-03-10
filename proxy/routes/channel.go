package routes

import (
	"log"
	"net/http"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/youtube"
	"github.com/labstack/echo/v4"
)

func (h *DepHandler) ChannelRoutes(e *echo.Echo) {
	ytToken := h.deps.YTApiKey
	yt := youtube.New(&youtube.YTOptions{ApiKey: ytToken})

	// Channel routes should always be the channel ID, not a handle or the username
	e.GET("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")
		// isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		channelResp := yt.Channel(channelId).Items[0]
		channelSnippet := channelResp.Snippet

		return c.JSON(http.StatusOK, cachedChannelMeta{
			Name:      channelSnippet.Title,
			Handle:    channelSnippet.CustomUrl,
			ChannelId: youtube.StripIdentifiers(channelResp.Id),
			Avatar:    channelSnippet.Thumbnails.Medium.URL,
		})
	})

	e.POST("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.PATCH("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.DELETE("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})
}
