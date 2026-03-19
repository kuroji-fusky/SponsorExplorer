package internal

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

type RedisBridge struct {
	RedisDB *redis.Client
	RCTX    context.Context
}

func NewRedisInstance(rdb *redis.Client, ctx context.Context) *RedisBridge {
	return &RedisBridge{
		RedisDB: rdb,
		RCTX:    ctx,
	}
}

type NetworkLog struct {
	Type        string
	Url         string
	RequestTime string
}

func (netLog NetworkLog) RedisValues() map[string]any {
	return map[string]any{
		"type":         netLog.Type,
		"url":          netLog.Url,
		"request_time": netLog.RequestTime,
	}
}

func (bridge *RedisBridge) AddEventLog(netLog NetworkLog) {
	if bridge == nil || bridge.RedisDB == nil || bridge.RCTX == nil {
		log.Default().Println("event log skipped: redis client or context is nil")
		return
	}

	res, err := bridge.RedisDB.XAdd(bridge.RCTX, &redis.XAddArgs{
		Stream: "log:net_events",
		Values: netLog.RedisValues(),
	}).Result()

	if err != nil {
		log.Default().Printf("event log failed: %v", err)
		return
	}

	log.Default().Println(res)
}
