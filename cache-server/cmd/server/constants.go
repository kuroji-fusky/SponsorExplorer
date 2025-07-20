package main

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
