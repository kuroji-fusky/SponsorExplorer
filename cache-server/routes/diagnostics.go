package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func RegisterDiagRoutes(e *echo.Echo) {
	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pong")
	})

	e.GET("/status", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{})
	})
}
