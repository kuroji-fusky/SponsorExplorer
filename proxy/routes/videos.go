package routes

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func VideoRoutes(e *echo.Echo) {
	e.GET("/yt/video/:id", func(c echo.Context) error {
		videoId := c.Param("id")

		if len(videoId) != 11 {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"_error": "YouTube video IDs are exactly 11 characters long. Did you make sure it's the correct ID and not a typo?",
			})
		}

		return c.JSON(http.StatusOK, cachedVideoMeta{
			Details: videoMeta{
				Channel: &videoMetaWithChannelDetails{
					Name:   "Nick Wilde",
					Handle: "@thewildefox",
					// Starting characters "UC" are stripped to save some resp bytes
					ChannelId: "KeFLvCLdP3FTSEFU9rNKHg",
					Avatar:    "https://yt.img.something/",
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
