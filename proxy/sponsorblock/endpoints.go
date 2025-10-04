package sponsorblock

const baseEndpoint = "https://sponsor.ajay.app/api/"

// Note: URL param `?service=YouTube` is omitted since it appends them automatically
type SkipSegmentsParams struct {
	VideoID     string               `url:"videoID"`
	Categories  *[]SegmentCategory   `url:"category,omitempty"`
	ActionTypes *[]SegmentActionType `url:"actionType,omitempty"`
}

type SearchSegmentsParams struct {
	SkipSegmentsParams
	Page     *int  `url:"number,omitempty"`
	MinVotes *int  `url:"minVotes,omitempty"`
	MaxVotes *int  `url:"maxVotes,omitempty"`
	MinViews *int  `url:"minViews,omitempty"`
	MaxViews *int  `url:"maxViews,omitempty"`
	Hidden   *bool `url:"hidden,omitempty"`
	Ignored  *bool `url:"ignored,omitempty"`
}

func SkipSegments(params SkipSegmentsParams) {
}

func SearchSegments(params SearchSegmentsParams) {
}

type LockCategoriesParams struct {
	Id         string              `url:"videoID"`
	ActionType []SegmentActionType `url:"actionTypes"`
}

func LockCategories(params LockCategoriesParams) {
}

type LockReasonParams struct {
	LockCategoriesParams
	Categories []SegmentCategory `url:"categories"`
}

func LockReason(params LockCategoriesParams) {
}

func SegmentInfo(uuid ...string) {
}

func UserID(username string, isExact *bool) {}

type UserInfoParams struct {
	UserID       string    `url:"userID"`
	PublicUserID *string   `url:"publicUserID,omitempty"`
	Values       *[]string `url:"values,omitempty"`
}

type UserInfoResponse struct {
	UserID              string  `json:"userID"`
	UserName            string  `json:"userName"`
	MinutesSaved        float64 `json:"minutesSaved"`
	SegmentCount        int     `json:"segmentCount"`
	IgnoredSegmentCount int     `json:"ignoredSegmentCount"`
	ViewCount           int     `json:"viewCount"`
	IgnoredViewCount    int     `json:"ignoredViewCount"`
	Warnings            int     `json:"warnings"`
	Reputation          float64 `json:"reputation"`
	IsVIP               int     `json:"vip"`
	LastSegmentID       string  `json:"lastSegmentID"`
	Permissions         struct {
		Category bool `json:"category"`
	} `json:"permissions"`
}

func UserInfo(params UserInfoParams) {
}

type UserStatsParams struct {
	UserID               string `url:"userID"`
	PublicUserID         string `url:"publicUserID"`
	FetchCategoryStats   bool   `url:"fetchCategoryStats"`
	FetchActionTypeStats bool   `url:"fetchActionTypeStats"`
}
type UserStatsResponse struct {
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

func UserStats(params UserStatsParams) (response *HTTPWrapper[UserViewsResponse], error error) {
	juicyData, err := httpWrapper[UserViewsResponse](httpGET, "/userStats", nil)

	return juicyData, err
}

type UserViewsResponse struct {
	ViewCount int `json:"viewCount"`
}

func GetViewsForUser(userId string) (response *HTTPWrapper[UserViewsResponse], error error) {
	juicyData, err := httpWrapper[UserViewsResponse](httpGET, "/getViewsForUser", nil)

	return (*HTTPWrapper[UserViewsResponse])(juicyData), err
}
