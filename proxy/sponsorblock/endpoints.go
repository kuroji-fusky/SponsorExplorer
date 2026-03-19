package sponsorblock

// Config for `skipSegments` and `searchSegments`
//
// Note: URL param `?service=YouTube` is omitted since it appends them automatically
type SkipAndSearchCategoriesConfig struct {
	Categories []SegmentCategory   `query:"category,omitempty"`
	ActionType []SegmentActionType `query:"actionType,omitempty"`
	Page       int                 `query:"number,omitempty"`
	MinVotes   int                 `query:"minVotes,omitempty"`
	MaxVotes   int                 `query:"maxVotes,omitempty"`
	MinViews   int                 `query:"minViews,omitempty"`
	MaxViews   int                 `query:"maxViews,omitempty"`
	Hidden     bool                `query:"hidden,omitempty"`
	Ignored    bool                `query:"ignored,omitempty"`
}

type LockCategoriesConfig struct {
	Id         string             `query:"videoID"`
	ActionType *SegmentActionType `query:"actionType"`
}

// func LockCategoriesWithConfig(params LockCategoriesConfig) {
// }
