package sponsorblock

// Config for `skipSegments` and `searchSegments`
//
// Note: URL param `?service=YouTube` is omitted since it appends them automatically
type SkipAndSearchCategoriesConfig struct {
	Categories []SegmentCategory   `url:"category,omitempty"`
	ActionType []SegmentActionType `url:"actionType,omitempty"`
	Page       int                 `url:"number,omitempty"`
	MinVotes   int                 `url:"minVotes,omitempty"`
	MaxVotes   int                 `url:"maxVotes,omitempty"`
	MinViews   int                 `url:"minViews,omitempty"`
	MaxViews   int                 `url:"maxViews,omitempty"`
	Hidden     bool                `url:"hidden,omitempty"`
	Ignored    bool                `url:"ignored,omitempty"`
}

type LockCategoriesConfig struct {
	Id         string             `url:"videoID"`
	ActionType *SegmentActionType `url:"actionType"`
}

// func LockCategoriesWithConfig(params LockCategoriesConfig) {
// }
