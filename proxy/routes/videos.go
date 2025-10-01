package routes

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func VideoRoutes(e *echo.Echo) {
	e.GET("/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")
		prettifyOutput, _ := strconv.ParseBool(c.QueryParam("prettify"))

		// Temporary fix for unused variable
		log.Print(channelId, prettifyOutput)

		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})

	e.POST("/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})

	e.PATCH("/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})

	e.DELETE("/video/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})
}
