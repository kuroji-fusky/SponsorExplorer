package internal

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type httpFetchResponse struct {
	Body       []byte
	StatusCode int
}

func httpRequestTemplate(method string, url string, body io.Reader) (*httpFetchResponse, error) {
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("User-Agent", "compatible+KuroBot/1.0; for SponsorExplorer caching <se.fusky.dev>")
	if method == http.MethodPost {
		req.Header.Add("Content-Type", "application/json")
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	fmt.Println("=>", method, url)

	return &httpFetchResponse{
		Body:       respBody,
		StatusCode: resp.StatusCode,
	}, nil
}

func Fetch(url string) (*httpFetchResponse, error) {
	return httpRequestTemplate(http.MethodGet, url, nil)
}

func Post(url string, body io.Reader) (*httpFetchResponse, error) {
	return httpRequestTemplate(http.MethodPost, url, body)
}

func (r *httpFetchResponse) Plaintext() string {
	return string(r.Body)
}

func (r *httpFetchResponse) JSON(v any) error {
	return json.Unmarshal(r.Body, v)
}
