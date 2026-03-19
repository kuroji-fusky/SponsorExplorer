package sponsorblock

func UserID(username string, isExact *bool) {}

type UserInfoConfig struct {
	UserID       string    `query:"userID"`
	PublicUserID *string   `query:"publicUserID,omitempty"`
	Values       *[]string `query:"values,omitempty"`
}

func UserInfoWithConfig(params *UserInfoConfig) {

}
