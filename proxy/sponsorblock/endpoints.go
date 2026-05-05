package sponsorblock

type LockCategoriesConfig struct {
	Id         string             `query:"videoID"`
	ActionType *SegmentActionType `query:"actionType"`
}

// func LockCategoriesWithConfig(params LockCategoriesConfig) {
// }
