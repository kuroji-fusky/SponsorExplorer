package main

type CommonYTParameters struct {
	MaxLength int `query:"max_results,omitempty"`
}

type PlaylistParameters struct {
	CommonYTParameters
	PlaylistId string `query:"id"`
}

type VideoParameters struct {
	CommonYTParameters
	Id           string `query:"id"`
	SegmentFetch int    `query:"segment_fetch,omitempty"` // how many times to recursively loop for sponsorblock pagination
}

type SegmentAnalysisParameters struct {
	MaxSegmentFetch int `query:"segment_fetch,omitempty"` // default 15
}

type SegmentAnalysisForm struct {
	Sort   string `form:"sort,omitempty"`
	Filter any    `form:"filters,omitempty"`
}
