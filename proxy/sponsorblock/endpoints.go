package sponsorblock

const baseEndpoint = "https://sponsor.ajay.app/api/"

// Config for `skipSegments` and `searchSegments`
//
// Note: URL param `?service=YouTube` is omitted since it appends them automatically
type SkipAndSearchSegmentsConfig struct {
	VideoID     string               `url:"videoID"`
	Categories  *[]SegmentCategory   `url:"category,omitempty"`
	ActionTypes *[]SegmentActionType `url:"actionType,omitempty"`
	Page        *int                 `url:"number,omitempty"`
	MinVotes    *int                 `url:"minVotes,omitempty"`
	MaxVotes    *int                 `url:"maxVotes,omitempty"`
	MinViews    *int                 `url:"minViews,omitempty"`
	MaxViews    *int                 `url:"maxViews,omitempty"`
	Hidden      *bool                `url:"hidden,omitempty"`
	Ignored     *bool                `url:"ignored,omitempty"`
}

func SkipSegments(params SkipAndSearchSegmentsConfig) {
}

func SearchSegments(params SkipAndSearchSegmentsConfig) {
}

type LockCategoriesConfig struct {
	Id         string
	ActionType []SegmentActionType
}

func LockCategories(params LockCategoriesConfig) {
}

type LockReasonConfig struct {
	LockCategoriesConfig
	Categories []SegmentCategory
}

func LockReason(params LockCategoriesConfig) {

}

func SegmentInfo(uuid ...string) {
}

func UserID(username string, isExact *bool) {}

type UserInfoConfig struct {
	UserID       string    `url:"userID"`
	PublicUserID *string   `url:"publicUserID,omitempty"`
	Values       *[]string `url:"values,omitempty"`
}

func UserInfo(params UserInfoConfig) {

}

type (
	UserStatsConfig struct {
		UserID               string `url:"userID"`
		PublicUserID         string `url:"publicUserID"`
		FetchCategoryStats   bool   `url:"fetchCategoryStats"`
		FetchActionTypeStats bool   `url:"fetchActionTypeStats"`
	}
	UserStatsResponse struct {
		UserId       string `json:"userID"`
		Username     string `json:"userName"`
		OverallStats struct {
			MinutesSaved int `json:"minutesSaved"`
			SegmentCount int `json:"segmentCount"`
		} `json:"overallStats"`
		CategoryCount struct {
			Sponsor         int `json:"sponsor"`
			Intro           int `json:"intro"`
			Outro           int `json:"outro"`
			Interaction     int `json:"interaction"`
			Selfpromo       int `json:"selfpromo"`
			NonMusic        int `json:"music_offtopic"`
			Preview         int `json:"preview"`
			Highlight       int `json:"poi_highlight"`
			Tangents        int `json:"filler"`
			Hook            int `json:"hook"`
			ExclusiveAccess int `json:"exclusive_access"`
			Chapter         int `json:"chapter"`
		} `json:"categoryCount,omitempty"`
		ActionTypeCount struct {
			Skip            int `json:"skip"`
			Mute            int `json:"mute"`
			FullLabel       int `json:"full"`
			PointOfInterest int `json:"poi"`
			Chapter         int `json:"chapter"`
		} `json:"actionTypeCount,omitempty"`
	}
)

func UserStats(params UserStatsConfig) {
	url := baseEndpoint + "/userStats"
}

func GetViewsForUser(userId string) (response *HTTPWrapper[UserStatsResponse], err error) {
	juicyData, skillIssue := httpWrapper[UserStatsResponse](httpGET, "/getViewsForUser", nil)

	return (*HTTPWrapper[UserStatsResponse])(juicyData), skillIssue
}
