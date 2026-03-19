package youtube

import (
	"strings"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
)

const DEFAULT_MAX_RESULTS = 25

func (yt *YTOptions) buildURL(path string, params any) string {
	return internal.BuildURLWithQuery(BASE_ENDPOINT+path, params)
}

func (yt *YTOptions) prepareCommonParams(params *ytCommonParams, defaultParts ...YTResPart) *ytCommonParams {
	prepared := &ytCommonParams{}
	if params != nil {
		*prepared = *params
	}

	prepared.Key = yt.ApiKey
	if prepared.MaxResults == nil {
		prepared.MaxResults = intPtr(DEFAULT_MAX_RESULTS)
	}

	if prepared.Part == "" {
		prepared.Part = joinParts(defaultParts...)
	}

	return prepared
}

func joinParts(parts ...YTResPart) string {
	if len(parts) == 0 {
		return ""
	}

	partValues := make([]string, 0, len(parts))
	for _, part := range parts {
		partValues = append(partValues, string(part))
	}

	return strings.Join(partValues, ",")
}

func intPtr(value int) *int {
	return &value
}
