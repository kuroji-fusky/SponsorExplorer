package main

type CachedChannelMeta struct {
	Name     string            `json:"name"`
	Handle   string            `json:"forHandle,omitempty"`
	Id       string            `json:"id"`
	Videos   []CachedVideoMeta `json:"videos"`
	Segments *[]CachedSegments `json:"segments"`
}

type CachedVideoMeta struct {
	Id         string            `json:"id"`
	Duration   string            `json:"duration"`
	Thumbnail  string            `json:"thumbnail"`
	Title      string            `json:"title"`
	UploadDate string            `json:"uploadDate"`
	Segments   *[]CachedSegments `json:"segments"`
}

type segmentLength struct {
	Start, End int
}

type SegmentCategory string
type SegmentActionType string

const (
	CategoryTangents    SegmentCategory = "Tangents/Jokes"
	CategorySponsor     SegmentCategory = "Sponsor"
	CategorySelfpromo   SegmentCategory = "Unpaid/Self Promotion"
	CategoryIntro       SegmentCategory = "Intro/Intermission"
	CategoryOutro       SegmentCategory = "Endcards/Credits"
	CategoryNonMusic    SegmentCategory = "Non-Music"
	CategoryPreview     SegmentCategory = "Preview/Recap/Hook"
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
