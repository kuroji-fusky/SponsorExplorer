package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func AnalysisRoutes(e *echo.Echo) {
	e.GET("/video/:id/analysis", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})

	e.GET("/channel/:id/analysis", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})

	e.POST("/uuid/analysis", func(c echo.Context) error {
		// uuidArr := strings.Split(c.QueryParam("uuid"), ",")
		uuidArr := c.Request().Body

		return c.NoContent(http.StatusOK)
	})

	e.GET("/username/:name/analysis", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})
}
