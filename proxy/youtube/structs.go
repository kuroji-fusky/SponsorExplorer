// I'm not installing a whole damn package so I need to cherry-pick what's required for this project
package youtube

type YTResPart string

// Only including those that doesn't require OAuth 2.0
const (
	YtPartSnippet        YTResPart = "snippet"
	YTPartContentDetails YTResPart = "contentDetails"
	YTPartStatistics     YTResPart = "statistics"
)

type ytCommonParams struct {
	Part       []YTResPart `url:"part"`
	Id         string      `url:"id"`
	Key        string      `url:"key"`
	MaxResults int         `url:"maxResults"`
	PageToken  int         `url:"pageToken"`
}

type Common ytCommonParams

////////////////////////////////////////////////////////////////

type ytResponseTemplate[S any] struct {
	Kind     string `json:"kind"`
	Etag     string `json:"etag"`
	Items    []*S   `json:"items"`
	PageInfo struct {
		TotalResults   int `json:"totalResults"`
		ResultsPerPage int `json:"resultsPerPage"`
	} `json:"pageInfo"`
}

type thumbnailResponse struct {
	URL    string `json:"url"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
}

// Fields omitted that are not required for this project:
// - `snippet.categoryId`
// - `snippet.localized` (for now)
// - `snippet.liveBroadcastContent`
// - `snippet.defaultAudioLanguage`
// - `snippet.tags`
// - `contentDetails.dimension
// - `contentDetails.definition`
// - `contentDetails.caption
// - `contentDetails.licensedContent
// - `contentDetails.projection`

type thumbnails struct {
	Default  thumbnailResponse `json:"default"`
	Medium   thumbnailResponse `json:"medium"`
	High     thumbnailResponse `json:"high"`
	Standard thumbnailResponse `json:"standard"`
	MaxRes   thumbnailResponse `json:"maxres"`
}

type videoResponse struct {
	Kind    string `json:"kind"`
	Etag    string `json:"etag"`
	Id      string `json:"id"`
	Snippet struct {
		PublishedAt  string     `json:"publishedAt"`
		ChannelId    string     `json:"channelId"`
		Title        string     `json:"title"`
		Description  string     `json:"description"`
		Thumbnails   thumbnails `json:"thumbnails"`
		ChannelTitle string     `json:"channelTitle"`
	} `json:"snippet"`
	ContentDetails struct {
		Duration string `json:"duration"`
	} `json:"contentDetails"`
}

type channelResponse struct {
	Kind    string `json:"kind"`
	Etag    string `json:"etag"`
	Id      string `json:"id"`
	Snippet struct {
		Title       string     `json:"title"`
		Description string     `json:"description,omitempty"`
		CustomUrl   string     `json:"customUrl,omitempty"`
		PublishedAt string     `json:"publishedAt"`
		Thumbnails  thumbnails `json:"thumbnails"`

		Localized struct {
			Title       string `json:"title"`
			Description string `json:"description"`
		} `json:"localized"`
	} `json:"snippet"`

	// contentDetails are pointless lol
}

type YTVideoResponse ytResponseTemplate[videoResponse]
type YTChannelResponse ytResponseTemplate[channelResponse]

////////////////////////////////////////////////////////////////

type YtXMLVideoEntry []struct {
	VideoId string `xml:"yt:videoId"`
}

type YTXMLVideoFeed struct {
	ChannelId    string `xml:"id"`
	ChannelTitle string `xml:"title"`
	YtXMLVideoEntry
}
