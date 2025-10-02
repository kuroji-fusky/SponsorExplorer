package routes

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

func AnalysisRoutes(e *echo.Echo) {
	e.GET("/video/:id/analysis", func(c echo.Context) error {
		videoId := c.Param("id")

		fmt.Print(videoId)

		return c.NoContent(http.StatusOK)
	})

	e.GET("/channel/:id/analysis", func(c echo.Context) error {
		channelId := c.Param("id")
		sampleSize, _ := strconv.Atoi(c.QueryParam("sample_size"))
		prettifyOutput, _ := strconv.ParseBool(c.QueryParam("prettify"))
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		// Temporary fix for unused variable
		log.Print(channelId, sampleSize, prettifyOutput, isBypassCache)

		return c.NoContent(http.StatusOK)
	})

	e.POST("/uuid/analysis", func(c echo.Context) error {
		biteMeDaddy, biteErr := io.ReadAll(c.Request().Body)
		if biteErr != nil {
			return c.JSON(http.StatusBadRequest, map[string]any{
				"error": "GIVE ME SOMETHING, I'M HUNGRY AF",
			})
		}

		uuidArr := strings.Split(string(biteMeDaddy), ",")

		fmt.Println(uuidArr)

		return c.NoContent(http.StatusOK)
	})

	e.GET("/username/:name/analysis", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})
}
