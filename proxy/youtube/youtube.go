package youtube

import (
	"context"
	"regexp"
	"strconv"

	"github.com/redis/go-redis/v9"
)

type YTOptions struct {
	Redis            *redis.Client
	RedisCtx         context.Context
	ApiKey           string `query:"key"`
	DefaultMaxResult int    `query:"max_result,omitempty"`
}

const (
	BASE_ENDPOINT   = "https://www.googleapis.com/youtube/v3"
	MAX_RESULTS_CAP = 50

	CHANNEL_ID              = "UC"
	CHANNEL_PLAYLIST_PREFIX = "UU"
	CHANNEL_VIDEOS          = CHANNEL_PLAYLIST_PREFIX + "LF"
)

// I might need to expand the logic here soon lmao
func StripIdentifiers(id string) string {
	return id[2:]
}

func New(opts *YTOptions) *YTOptions {
	var defaultMaxResult int = 5

	if opts.DefaultMaxResult != 0 {
		defaultMaxResult = opts.DefaultMaxResult
	}

	return &YTOptions{
		Redis:            opts.Redis,
		RedisCtx:         opts.RedisCtx,
		ApiKey:           opts.ApiKey,
		DefaultMaxResult: defaultMaxResult,
	}
}

func ParseYTDuration(durStr string) int64 {
	re := regexp.MustCompile(`PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?`)
	matches := re.FindStringSubmatch(durStr)

	if len(matches) == 0 {
		return 0
	}

	var totalMoToGago int64

	if matches[1] != "" {
		totalMoToGago += naakayIntBro(matches[1]) * 3600
	}

	if matches[2] != "" {
		totalMoToGago += naakayIntBro(matches[2]) * 60
	}

	if matches[3] != "" {
		totalMoToGago += naakayIntBro(matches[3])
	}

	return totalMoToGago
}

func naakayIntBro(str string) int64 {
	i, _ := strconv.ParseInt(str, 10, 64)
	return i
}
