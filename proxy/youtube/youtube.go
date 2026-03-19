package youtube

import (
	"context"

	"github.com/redis/go-redis/v9"
)

const BASE_ENDPOINT = "https://www.googleapis.com/youtube/v3"
const MAX_RESULTS_CAP = 50

type YTOptions struct {
	Redis            *redis.Client
	RedisCtx         context.Context
	ApiKey           string `url:"key"`
	DefaultMaxResult int    `url:"max_result,omitempty"`
}

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
