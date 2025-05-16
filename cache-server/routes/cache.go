package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func RegisterSegmentCache(e *echo.Echo) {}

type cachedChannelMeta struct {
	Name   string            `json:"name"`
	Handle string            `json:"forHandle,omitempty"`
	Id     string            `json:"id"`
	Videos []cachedVideoMeta `json:"videos"`
}

type cachedVideoMeta struct {
	Id         string `json:"id"`
	Duration   string `json:"duration"`
	Thumbnail  string `json:"thumbnail"`
	Title      string `json:"title"`
	UploadDate string `json:"uploadDate"`
}

func RegisterYTCacheRoutes(e *echo.Echo) {
	// uploading stuff from the server
	e.POST("/cache", func(c echo.Context) error {
		// just return a success status, too lazy to setup redis atm
		return c.NoContent(http.StatusOK)
	})

	// retrieving the cache
	e.GET("/cache/channel/{id}", func(c echo.Context) error {
		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.GET("/cache/video/{id}", func(c echo.Context) error {
		return c.JSON(http.StatusOK, cachedVideoMeta{})
	})
}
