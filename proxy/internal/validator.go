package internal

type JsonErrorResponse struct {
	ErrorMsg string  `json:"error_msg"`
	Cause    *string `json:"cause,omitempty"`
}

const (
	YT_INVALID_VIDEO = "YouTube video IDs are exactly 11 characters long. Did you make sure it's the correct ID and not a typo?"
)

func CheckValidYoutubeId(videoId string) bool {
	if len(videoId) != 11 {
		return false
	}

	return true
}
