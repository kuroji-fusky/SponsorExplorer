package youtube

import (
	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
)

func (yt *YTOptions) Channel(channelId string) YTChannelResponse {
	// !! By default, the consumer is looking for a latest upload, so it'll use the
	// !! RSS feed instead to fetch the latest 25 uploads of a given channel
	// !! without relying the need for an API key
	// !!
	// !! However, it still needs to call from the API to only get the avatar of a channel, and its total uploads
	// !! It's stupid I know
	// !! Unless if I had to use a web driver of some kind to bypass the need for YT API calls, it'll do for now
	// latestVideoFeed, err := internal.Fetch("https://www.youtube.com/feeds/videos.xml?channel_id" + channelId)
	// if err != nil {
	// 	fmt.Errorf("Something messed up: %s", err)
	// }

	// latestVideoFeed, err := internal.Fetch("https://www.youtube.com/feeds/videos.xml?channel_id" + channelId)
	// return latestVideoFeed.Plaintext()
	endpoint := BASE_ENDPOINT + "/channels?part=snippet,contentDetails" + "&id=" + channelId + "&key=" + yt.ApiKey
	resp, _ := internal.Fetch(endpoint)

	var channelsRes YTChannelResponse

	if err := resp.JSON(&channelsRes); err != nil {
		panic(err)
	}

	return channelsRes
}
