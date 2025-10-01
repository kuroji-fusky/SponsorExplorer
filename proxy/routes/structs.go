package routes

import "github.com/kuroji-fusky/SponsorExplorer/proxy/sponsorblock"

type CachedChannelMeta struct {
	Name     string                         `json:"name"`
	Handle   string                         `json:"forHandle,omitempty"`
	Id       string                         `json:"id"`
	Videos   []CachedVideoMeta              `json:"videos"`
	Segments *[]sponsorblock.CachedSegments `json:"segments"`
}

type CachedVideoMeta struct {
	Id         string                         `json:"id"`
	Duration   string                         `json:"duration"`
	Thumbnail  string                         `json:"thumbnail"`
	Title      string                         `json:"title"`
	UploadDate string                         `json:"uploadDate"`
	Segments   *[]sponsorblock.CachedSegments `json:"segments"`
}
