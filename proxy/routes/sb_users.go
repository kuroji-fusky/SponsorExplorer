package routes

import (
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

type VIPUsers []struct {
	Username string `json:"username"`
	UserID   string `json:"userid"`
}

func SBUsersRoute(e *echo.Echo) {
	e.GET("/sb/user/:username_uuid", func(c echo.Context) error {
		uuid := c.Param("username_uuid")
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		fmt.Println(uuid, isBypassCache)

		return c.NoContent(http.StatusOK)
	})

	e.POST("/sb/uuid", func(c echo.Context) error {
		biteMeDaddy, err := io.ReadAll(c.Request().Body)

		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]any{
				"msg": "Empty or missing body, please fill in the contents to APPEASE ME",
			})
		}

		uuidArr := strings.Split(string(biteMeDaddy), ",")

		// TODO Validate of one of these are a vaild UUIDs; otherwise, discard them and throw an error

		uuids := strings.Join(uuidArr, "")

		return c.String(http.StatusOK, uuids)
	})

	e.GET("/sb/vip_users", func(c echo.Context) error {
		return c.JSON(http.StatusOK, VIPUsers{})
	})
}
