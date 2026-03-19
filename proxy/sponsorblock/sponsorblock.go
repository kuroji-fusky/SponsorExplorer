package sponsorblock

import "github.com/kuroji-fusky/SponsorExplorer/proxy/internal"

const BASE_ENDPOINT = "https://sponsor.ajay.app/api"

type sponBlockSync internal.RedisBridge

func NewSponBlocc(rb *internal.RedisBridge) *sponBlockSync {
	return &sponBlockSync{
		RedisDB: rb.RedisDB,
		RCTX:    rb.RCTX,
	}
}
