package internal

import (
	"encoding/json"
	"io"
	"net/http"
)

type fetchResponse struct {
	body       []byte
	StatusCode int
}

func requestTemplate(method string, url string, body io.Reader) (*fetchResponse, error) {
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("User-Agent", "For SponsorExplorer caching")
	if method == http.MethodPost {
		req.Header.Add("Content-Type", "application/json")
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	touchMyBody, err := io.ReadAll(resp.Body)

	return &fetchResponse{
		body:       touchMyBody,
		StatusCode: resp.StatusCode,
	}, nil
}

func FetchMeDaddy(url string) (*fetchResponse, error) {
	return requestTemplate(http.MethodGet, url, nil)
}

func PostMeDaddy(url string, body io.Reader) (*fetchResponse, error) {
	return requestTemplate(http.MethodPost, url, body)
}

func (r *fetchResponse) Plaintext() string {
	return string(r.body)
}

func (r *fetchResponse) JSON(v any) error {
	return json.Unmarshal(r.body, v)
}
