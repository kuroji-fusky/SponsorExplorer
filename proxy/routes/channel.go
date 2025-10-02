package routes

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func ChannelRoutes(e *echo.Echo) {
	// Channel routes should always be the channel ID, not a handle or the username
	e.GET("/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")
		prettifyOutput, _ := strconv.ParseBool(c.QueryParam("prettify"))
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		// Temporary fix for unused variable
		log.Print(channelId, prettifyOutput, isBypassCache)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.POST("/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.PATCH("/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.DELETE("/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})
}
