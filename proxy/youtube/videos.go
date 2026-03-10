package youtube

import (
	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
)

func (yt *YTOptions) Video(id string) YTVideoResponse {
	endpoint := BASE_ENDPOINT + "/videos?part=snippet,contentDetails" + "&id=" + id + "&key=" + yt.ApiKey
	resp, _ := internal.Fetch(endpoint)

	var videoRes YTVideoResponse
	if err := resp.JSON(&videoRes); err != nil {
		panic(err)
	}

	return videoRes
}

type PlaylistItemsParams struct {
	Common
}

// func (yt *YTOptions) PlaylistItems(params PlaylistItemsParams)
