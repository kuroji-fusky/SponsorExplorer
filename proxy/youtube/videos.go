package youtube

import (
	"time"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
)

func (yt *YTOptions) Video(id string, params *ytCommonParams) YTVideoResponse {
	start := time.Now()

	endpoint := yt.buildURL("/videos", struct {
		ytCommonParams
		Id string `query:"id"`
	}{
		ytCommonParams: *yt.prepareCommonParams(params, YTPartSnippet, YTPartContentDetails, YTPartStatistics),
		Id:             id,
	})
	resp, _ := internal.Fetch(endpoint)

	elapsed := time.Since(start).Seconds()

	var videoRes YTVideoResponse
	if err := resp.JSON(&videoRes); err != nil {
		panic(err)
	}

	rdb := internal.NewRedisInstance(yt.Redis, yt.RedisCtx)
	rdb.AddEventLog(internal.NetworkLog{
		Url:         resp.URL,
		Type:        "raw",
		RequestTime: elapsed,
	})

	return videoRes
}
