package routes

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/kuroji-fusky/SponsorExplorer/proxy/sponsorblock"
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
	sb := sponsorblock.NewSponBlock(&internal.RedisBridge{
		RedisDB: h.deps.Redis,
		RCTX:    h.deps.RedisCtx,
	})

	e.GET("/sb/searchSegments/:id", func(c echo.Context) error {
		videoId := c.Param("id")
		// isBypassCache, _ := strconv.Atoi(c.QueryParam("bypass_cache"))
		// passiveUpdate, _ := strconv.Atoi(c.QueryParam("passive_update"))
		// continueFragment, _ := strconv.ParseInt(c.QueryParam("continue_fragment"), 10, 16)

		if !internal.CheckValidYoutubeId(videoId) {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"_error": internal.YT_INVALID_VIDEO,
			})
		}

		yeet := sb.SearchCategories(videoId, nil)

		fmt.Println(yeet.Errors)

		return c.JSON(http.StatusOK, yeet)
	})

	// Reference: https://github.com/kuroji-fusky/SponsorExplorer/blob/nextjs-legacy/client/src/app/api/sb/skippableSegments/route.ts
	e.GET("/sb/skipSegments", func(c echo.Context) error {
		videoIdList := strings.Split(c.QueryParam("id"), ",")
		isBypassCache, _ := strconv.Atoi(c.QueryParam("bypass_cache"))
		passiveUpdate, _ := strconv.Atoi(c.QueryParam("passive_update"))

		fmt.Println(
			isBypassCache,
			passiveUpdate,
		)

		if len(videoIdList) == 0 {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error_msg": "At least one video ID is required for this endpoint.",
			})
		}

		return c.JSON(http.StatusOK, searchSegmentsResponse{})
	})
}
