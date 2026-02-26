package routes

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (h *DepHandler) ChannelRoutes(e *echo.Echo) {
	// Channel routes should always be the channel ID, not a handle or the username
	e.GET("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		// Temporary fix for unused variable
		log.Print(channelId, isBypassCache)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
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
