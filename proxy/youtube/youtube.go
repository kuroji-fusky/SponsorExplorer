package youtube

const BASE_ENDPOINT = "https://www.googleapis.com/youtube/v3/videos"

type YouToobOptions struct {
	ApiKey           string `url:"key"`
	DefaultMaxResult int    `url:"max_result,omitempty"`
}

func New(opts *YouToobOptions) *YouToobOptions {
	var defaultMax int = 5

	return &YouToobOptions{
		ApiKey:           opts.ApiKey,
		DefaultMaxResult: defaultMax,
	}
}
