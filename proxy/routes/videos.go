package routes

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func VideoRoutes(e *echo.Echo) {
	e.GET("/yt/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")
		prettifyOutput, _ := strconv.ParseBool(c.QueryParam("prettify"))

		// Temporary fix for unused variable
		log.Print(channelId, prettifyOutput)

		return c.JSON(http.StatusOK, cachedVideoMeta{})
	})

	e.POST("/yt/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedVideoMeta{})
	})

	e.PATCH("/yt/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedVideoMeta{})
	})

	e.DELETE("/yt/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedVideoMeta{})
	})
}
