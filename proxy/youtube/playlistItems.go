package youtube

import (
	"time"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
)

func (yt *YTOptions) PlaylistItems(playlistId string, params *ytCommonParams) YTPlaylistItemResponse {
	start := time.Now()

	endpoint := yt.buildURL("/playlistItems", struct {
		ytCommonParams
		PlaylistID string `query:"playlistId"`
	}{
		ytCommonParams: *yt.prepareCommonParams(params, YTPartSnippet, YTPartContentDetails),
		PlaylistID:     playlistId,
	})
	resp, _ := internal.Fetch(endpoint)

	elapsed := time.Since(start).Seconds()

	var playlistItemsRes YTPlaylistItemResponse
	if err := resp.JSON(&playlistItemsRes); err != nil {
		panic(err)
	}

	rdb := internal.NewRedisInstance(yt.Redis, yt.RedisCtx)

	rdb.AddEventLog(internal.NetworkLog{
		Url:         resp.URL,
		Type:        "raw",
		RequestTime: elapsed,
	})

	return playlistItemsRes
}
