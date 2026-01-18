package routes

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func VideoRoutes(e *echo.Echo) {
	e.GET("/yt/video/:id", func(c echo.Context) error {
		videoId := c.Param("id")
		prettifyOutput, _ := strconv.ParseBool(c.QueryParam("prettify"))

		if len(videoId) != 11 {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"_error": "YouTube video IDs are exactly 11 characters long. Did you make sure it's the correct ID and not a typo?",
			})
		}

		// Temporary fix for unused variable
		log.Print(prettifyOutput)

		return c.JSON(http.StatusOK, cachedVideoMeta{
			Details: videoMeta{
				Channel: &videoMetaWithChannelDetails{
					Name:      "Plainrock124",
					Handle:    "@plainrock124",
					ChannelId: "lmao",
					Avatar:    "yes",
				},
			},
		})
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
