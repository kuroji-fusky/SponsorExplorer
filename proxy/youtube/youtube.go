package youtube

const BASE_ENDPOINT = "https://www.googleapis.com/youtube/v3"

type YTOptions struct {
	ApiKey           string `url:"key"`
	DefaultMaxResult int    `url:"max_result,omitempty"`
}

func New(opts *YTOptions) *YTOptions {
	var defaultMaxResult int = 5

	if opts.DefaultMaxResult != 0 {
		defaultMaxResult = opts.DefaultMaxResult
	}

	return &YTOptions{
		ApiKey:           opts.ApiKey,
		DefaultMaxResult: defaultMaxResult,
	}
}
