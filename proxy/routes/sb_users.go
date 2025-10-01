package routes

import (
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

func SBUsers(e *echo.Echo) {
	e.GET("/uuid/:uuid", func(c echo.Context) error {
		uuid := c.Param("uuid")
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		return c.NoContent(http.StatusOK)
	})
	e.GET("/username/:username", func(c echo.Context) error {
		userName := c.Param("username")
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		return c.NoContent(http.StatusOK)
	})

	e.POST("/uuid/analysis", func(c echo.Context) error {
		biteMeDaddy, err := io.ReadAll(c.Request().Body)

		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]any{
				"msg": "Empty or missing body, please fill in the contents to APPEASE ME",
			})
		}

		uuidArr := strings.Split(string(biteMeDaddy), ",")
		// gaming := strings.Fields(uuidArr)

		fmt.Printf(strings.Join(uuidArr, ""))

		return c.NoContent(http.StatusOK)
	})
}
