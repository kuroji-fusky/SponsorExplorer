package sponsorblock

import "github.com/kuroji-fusky/SponsorExplorer/proxy/internal"

const BASE_ENDPOINT = "https://sponsor.ajay.app/api"

type sponBlockSync internal.RedisBridge

var AllSegments = []SegmentCategory{
	CategoryTangents,
	CategorySponsor,
	CategorySelfpromo,
	CategoryIntro,
	CategoryOutro,
	CategoryNonMusic,
	CategoryPreview,
	CategoryHook,
	CategoryInteraction,
	CategoryHighlight,
	CategoryChapter,
}

var AllActionTypes = []SegmentActionType{
	ActionFull,
	ActionHighlight,
	ActionMute,
	ActionSkip,
}

func NewSponBlock(rb *internal.RedisBridge) *sponBlockSync {
	return &sponBlockSync{
		RedisDB: rb.RedisDB,
		RCTX:    rb.RCTX,
	}
}
