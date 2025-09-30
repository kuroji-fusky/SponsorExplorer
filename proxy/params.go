package main

type CommonYTParameters struct {
	MaxLength int `url:"max_results,omitempty"`
}

type PlaylistParameters struct {
	CommonYTParameters
	PlaylistId string `url:"id"`
}

type VideoParameters struct {
	CommonYTParameters
	Id           string `url:"id"`
	SegmentFetch int    `url:"segment_fetch,omitempty"` // how many times to recursively loop for sponsorblock pagination
}

type SegmentAnalysisParameters struct {
	MaxSegmentFetch int `url:"segment_fetch,omitempty"` // default 15
}

type SegmentAnalysisForm struct {
	Sort   string `form:"sort,omitempty"`
	Filter any    `form:"filters,omitempty"`
}
