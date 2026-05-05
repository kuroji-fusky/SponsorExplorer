package routes

import (
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/labstack/echo/v4"
)

type VIPUsers []struct {
	Username string `json:"username"`
	UserID   string `json:"userid"`
}

type usernameSubmissionAnalysis struct {
	Username         string `json:"username"`
	UserID           string `json:"user_id"`
	TotalSubmissions int    `json:"total_submissions"`
	Ranks            struct {
		CategoryRanking   []categoryRank       `json:"category"`
		ActionTypeRanking []categoryActionType `json:"actiontype"`
	} `json:"ranks"`
	Stats struct {
		Videos []struct {
			videoDetails
			SegmentsSubmitted int `json:"segments_submitted"`
		} `json:"videos"`
		Channels []struct {
			Name              string `json:"name"`
			Avatar            string `json:"avatar"`
			Id                string `json:"id"`
			SegmentsSubmitted int    `json:"segments_submitted"`
		} `json:"channels"`
	} `json:"stats"`
}

func (h *DependencyHandler) SBUsersRoute(e *echo.Echo) {
	e.GET("/sb/user/:username_uuid", func(c echo.Context) error {
		uuid := c.Param("username_uuid")
		isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		fmt.Println(uuid, isBypassCache)

		return c.NoContent(http.StatusOK)
	})

	e.POST("/sb/uuid", func(c echo.Context) error {
		rawStr, err := io.ReadAll(c.Request().Body)

		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]any{
				"msg": "Empty or missing body",
			})
		}

		uuidArr := strings.Split(string(rawStr), ",")

		// TODO Validate of one of these are a vaild UUIDs; otherwise, discard them and throw an error

		uuids := strings.Join(uuidArr, "")

		return c.String(http.StatusOK, uuids)
	})

	e.GET("/sb/vip_users", func(c echo.Context) error {
		return c.JSON(http.StatusOK, VIPUsers{})
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
