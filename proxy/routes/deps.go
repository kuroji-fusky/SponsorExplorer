package routes

import (
	"context"

	"github.com/redis/go-redis/v9"
)

type ProxyDeps struct {
	YTApiKey string
	Redis    *redis.Client
	RedisCtx context.Context
}

type DependencyHandler struct {
	deps ProxyDeps
}

func NewDependencyHandler(deps ProxyDeps) *DependencyHandler {
	return &DependencyHandler{deps: deps}
}
