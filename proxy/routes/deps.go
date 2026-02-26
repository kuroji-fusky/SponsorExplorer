package routes

import "github.com/redis/go-redis/v9"

type ProxyDeps struct {
	YTApiKey string
	Redis    *redis.Client
}

type DepHandler struct {
	deps ProxyDeps
}

func NewDepHandler(deps ProxyDeps) *DepHandler {
	return &DepHandler{deps: deps}
}
