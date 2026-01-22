package routes

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/labstack/echo/v4"
)

func AnalysisRoutes(e *echo.Echo) {
	e.GET("/yt/video/:id/analysis", func(c echo.Context) error {
		videoId := c.Param("id")

		fmt.Print(videoId)

		return c.NoContent(http.StatusOK)
	})

	e.GET("/yt/channel/:id/analysis", func(c echo.Context) error {
		channelId := c.Param("id")
		sampleSize, _ := strconv.Atoi(c.QueryParam("sample_size"))
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		// Temporary fix for unused variable
		log.Print(channelId, sampleSize, isBypassCache)

		return c.NoContent(http.StatusOK)
	})

	e.POST("/sb/uuid/analysis", func(c echo.Context) error {
		giveMeHead := internal.ManageHeaders(c)
		giveMeHead.Etag("lmao")

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

	e.GET("/sb/username/:name/analysis", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})
}
