package routes

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

type (
	searchSegmentsResponse struct {
		VideoID string `json:"videoId"`
	}
	skipSegmentsResponse []struct {
		VideoID string `json:"videoId"`
	}
)

// Direct calls from the SponsorBlock API
// Note that responses from the proxy API is similar and is altered to be more... portable
func (h *DepHandler) SBProxyRoutes(e *echo.Echo) {
	e.GET("/sb/searchSegments/:id", func(c echo.Context) error {
		videoId := c.Param("id")
		isBypassCache, _ := strconv.Atoi(c.QueryParam("bypass_cache"))
		passiveUpdate, _ := strconv.Atoi(c.QueryParam("passive_update"))
		continueFragment, _ := strconv.ParseInt(c.QueryParam("continue_fragment"))

		return c.JSON(http.StatusOK, skipSegmentsResponse{})
	})

	// Reference: https://github.com/kuroji-fusky/SponsorExplorer/blob/nextjs-legacy/client/src/app/api/sb/skippableSegments/route.ts
	e.GET("/sb/skipSegments", func(c echo.Context) error {
		videoIdList := strings.Split(c.QueryParam("id"), ",")
		isBypassCache, _ := strconv.Atoi(c.QueryParam("bypass_cache"))
		passiveUpdate, _ := strconv.Atoi(c.QueryParam("passive_update"))

		if len(videoIdList) == 0 {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error_msg": "At least one video ID is required for this endpoint.",
			})
		}

		return c.JSON(http.StatusOK, searchSegmentsResponse{})
	})
}
