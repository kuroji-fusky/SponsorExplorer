package sponsorblock

type SegmentCategory string
type SegmentActionType string

const (
	CategoryTangents    SegmentCategory = "Tangents/Jokes"
	CategorySponsor     SegmentCategory = "Sponsor"
	CategorySelfpromo   SegmentCategory = "Unpaid/Self Promotion"
	CategoryIntro       SegmentCategory = "Intro/Intermission"
	CategoryOutro       SegmentCategory = "Endcards/Credits"
	CategoryNonMusic    SegmentCategory = "Non-Music"
	CategoryPreview     SegmentCategory = "Preview/Recap"
	CategoryHook        SegmentCategory = "Hook/Greetings"
	CategoryInteraction SegmentCategory = "Interaction Reminder"
	CategoryHighlight   SegmentCategory = "Highlight"
	CategoryChapter     SegmentCategory = "Chapter"
)

const (
	ActionSkip      SegmentActionType = "skip"
	ActionFull      SegmentActionType = "full"
	ActionMute      SegmentActionType = "mute"
	ActionHighlight SegmentActionType = "highlight"
)

type withErrorWrapper struct {
	Errors string `json:"_error,omitempty"`
}

type segmentLength struct {
	Start, End float64
}

type CachedSegments struct {
	VideoID        string            `json:"videoId,omitempty"` // A redundant property when fetching the video endpoint and won't be included unless you're fetching this from a channel endpoint
	Date           string            `json:"date_submitted"`
	UUID           string            `json:"uuid"`
	Length         segmentLength     `json:"length"`          // Returns [0.000, 1.234]
	LengthReadable string            `json:"length_readable"` // Returns HH:MM:SS formrat
	Category       SegmentCategory   `json:"category"`
	ActionType     SegmentActionType `json:"action_type"`
	Shadowhidden   bool              `json:"is_shadowhidden"`
	Hidden         bool              `json:"is_hidden"`
	UserID         string            `json:"userID"`
	Username       string            `json:"username,omitempty"`
}
