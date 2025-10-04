package sponsorblock

import (
	"encoding/json"
	"io"
	"net/http"
)

type HTTPWrapper[T any] struct {
	Status int     `json:"status_code"`
	Data   *T      `json:"data"`
	Errors *string `json:"errors"`
}

type httpMethod string

const (
	httpGET    httpMethod = "GET"
	httpPOST   httpMethod = "POST"
	httpPUT    httpMethod = "PUT"
	httpDELETE httpMethod = "DELETE"
	httpPATCH  httpMethod = "PATCH"
)

func httpWrapper[R any](method httpMethod, url string, bodyReq io.Reader) (response *HTTPWrapper[R], err error) {
	client := &http.Client{}

	req, req_err := http.NewRequest(string(method), baseEndpoint+url, bodyReq)
	if req_err != nil {
		return nil, req_err
	}

	// Just putting my mark just to not sus things out
	req.Header.Set("Server", "SkunkTech 1.0")
	req.Header.Set("User-Agent", "kuro-bot/1.0 via go-http-client")

	res, res_err := client.Do(req)
	if res_err != nil {
		return nil, res_err
	}

	defer res.Body.Close()

	statusCode := res.StatusCode
	bytes, read_err := io.ReadAll(res.Body)
	if read_err != nil {
		return nil, read_err
	}

	mimeType := http.DetectContentType(bytes)

	// 4xx and 5xx statuses aren't JSON for some reason, so this is a safety net to convert
	// text/plain and convert them as such to make sure all responses return JSON
	if mimeType != "application/json" {
		plainText := string(bytes)

		return &HTTPWrapper[R]{
			Status: statusCode,
			Data:   nil,
			Errors: &plainText,
		}, nil
	}

	var providedData R

	json_err := json.Unmarshal(bytes, &providedData)
	if json_err != nil {
		return nil, json_err
	}

	return &HTTPWrapper[R]{
		Status: statusCode,
		Data:   &providedData,
		Errors: nil,
	}, nil
}
