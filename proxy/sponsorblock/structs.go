package sponsorblock

type segmentLength struct {
	Start, End int
}

type CachedSegments struct {
	VideoID        *string           `json:"videoId,omitempty"` // A redundant property when fetching the video endpoint and won't be included unless you're fetching this from a channel endpoint
	Date           string            `json:"date_submitted"`
	UUID           string            `json:"uuid"`
	Length         segmentLength     `json:"length"`          // Returns [0.000, 1.234]
	LengthReadable string            `json:"length_readable"` // Returns HH:MM:SS formrat
	Category       SegmentCategory   `json:"category"`
	ActionType     SegmentActionType `json:"action_type"`
	Shadowhidden   bool              `json:"is_shadowhidden"`
	Hidden         bool              `json:"is_hidden"`
	UserID         string            `json:"userID"`
	Username       *string           `json:"username,omitempty"`
}
