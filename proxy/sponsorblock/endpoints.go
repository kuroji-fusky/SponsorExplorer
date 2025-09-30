package sponsorblock

const baseEndpoint = "https://sponsor.ajay.app/api/"

type LockCategoriesConfig struct {
	Id         string
	ActionType *SegmentActionType
}

func LockCategoriesWithConfig(cfg LockCategoriesConfig) {
}

//

// Config for `skipSegments` and `searchSegments`
//
// Note: URL param `?service=YouTube` is omitted since it appends them automatically
type SkipAndSearchCategoriesConfig struct {
	VideoID    string             `url:"videoID"`
	Categories *[]SegmentCategory `url:"category,omitempty"`
	Page       *int               `url:"number,omitempty"`
	MinVotes   *int               `url:"minVotes,omitempty"`
	MaxVotes   *int               `url:"maxVotes,omitempty"`
	MinViews   *int               `url:"minViews,omitempty"`
	MaxViews   *int               `url:"maxViews,omitempty"`
	Hidden     *bool              `url:"hidden,omitempty"`
	Ignored    *bool              `url:"ignored,omitempty"`
}

type UserIDConfig struct {
	Username string `url:"userName"`
	IsExact  *bool  `url:"exact,omitempty"`
}

type UserInfoConfig struct {
	UserID       string    `url:"userID"`
	PublicUserID *string   `url:"publicUserID,omitempty"`
	Values       *[]string `url:"values,omitempty"`
}
