package sponsorblock

func UserID(username string, isExact *bool) {}

type UserInfoConfig struct {
	UserID       string    `url:"userID"`
	PublicUserID *string   `url:"publicUserID,omitempty"`
	Values       *[]string `url:"values,omitempty"`
}

func UserInfoWithConfig(params UserInfoConfig) {

}
