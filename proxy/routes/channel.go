package routes

import (
	"log"
	"net/http"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/kuroji-fusky/SponsorExplorer/proxy/youtube"
	"github.com/labstack/echo/v4"
)

func (h *DepHandler) ChannelRoutes(e *echo.Echo) {
	rdb := internal.NewRedisInstance(h.deps.Redis, h.deps.RedisCtx)
	yt := youtube.New(&youtube.YTOptions{ApiKey: h.deps.YTApiKey, Redis: rdb.RedisDB, RedisCtx: rdb.RCTX})

	// Channel routes should always be the channel ID, not a handle or the username
	e.GET("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")
		// isBypassCache, _ := strconv.ParseBool(c.QueryParam("bypass_cache"))

		channelResp := yt.Channel(channelId, nil).Items[0]
		channelSnippet := channelResp.Snippet

		channelUrlStrip := youtube.StripIdentifiers(channelResp.Id)

		playlistItemsResp := yt.PlaylistItems("UULF"+channelUrlStrip, nil)
		playlistItems := playlistItemsResp.Items

		longFormVideoIds := []string{}

		for _, vid := range playlistItems {
			longFormVideoIds = append(longFormVideoIds, vid.Snippet.ResourceId.VideoId)
		}

		log.Default().Println(longFormVideoIds)

		// for _, vid := range playlistItemsResp.Items {
		// 	snippet := vid.Snippet

		// 	longFormVids = append(longFormVids, cachedVideoMeta{
		// 		ID: "lmao",
		// 		Details: videoMeta{
		// 			VideoType:  VideoNormal,
		// 			Title:      snippet.Title,
		// 			Thumbnail:  snippet.Thumbnails.High.URL,
		// 			UploadDate: snippet.PublishedAt,
		// 		},
		// 	})
		// }

		return c.JSON(http.StatusOK, cachedChannelMeta{
			Name:      channelSnippet.Title,
			Handle:    channelSnippet.CustomUrl,
			ChannelId: channelUrlStrip,
			Avatar:    channelSnippet.Thumbnails.Medium.URL,
			// Videos:    longFormVids,
		})
	})

	e.PATCH("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})

	e.DELETE("/yt/channel/:id", func(c echo.Context) error {
		channelId := c.Param("id")

		// Temporary fix for unused variable
		log.Print(channelId)

		return c.JSON(http.StatusOK, cachedChannelMeta{})
	})
}
