package routes

import (
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/labstack/echo/v4"
)

func (h *DepHandler) AnalysisRoutes(e *echo.Echo) {
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
