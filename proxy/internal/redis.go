package internal

import (
	"context"
	"encoding/json"
	"log"

	"github.com/redis/go-redis/v9"
)

type RedisBridge struct {
	RedisDB      *redis.Client
	RedisContext context.Context
}

func NewRedisInstance(rdb *redis.Client, ctx context.Context) *RedisBridge {
	return &RedisBridge{
		RedisDB:      rdb,
		RedisContext: ctx,
	}
}

type NetworkLog struct {
	Type        string  `json:"type"`
	Url         string  `json:"url"`
	RequestTime float64 `json:"request_time"`
}

func (bridge *RedisBridge) AddEventLog(netLog NetworkLog) {
	if bridge == nil || bridge.RedisDB == nil || bridge.RedisContext == nil {
		log.Default().Println("event log skipped: redis client or context is nil")
		return
	}

	payload, _ := json.Marshal(netLog)

	res, err := bridge.RedisDB.XAdd(bridge.RedisContext, &redis.XAddArgs{
		Stream: "log:net_events",
		Values: []any{
			"payload", string(payload),
		},
	}).Result()

	if err != nil {
		log.Default().Printf("event log failed: %v", err)
		return
	}

	log.Default().Println(res)
}

func (bridge *RedisBridge) ListAvailableCache() {}

func (bridge *RedisBridge) AddVideoCache(ttl int, payload *map[string]any) {}

func (bridge *RedisBridge) UpdateVideoCache(payload *map[string]any) {}

func (bridge *RedisBridge) AddChannelCache(ttl int, payload *map[string]any) {}

func (bridge *RedisBridge) UpdateChannelCache(channelId string, payload *map[string]any) {}

func (bridge *RedisBridge) AppendSegmentCache(videoId string, payload *map[string]any) {}
