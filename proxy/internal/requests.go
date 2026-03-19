package internal

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type HttpFetchResponse struct {
	Method      string
	URL         string
	Body        []byte
	StatusCode  int
	ContentType string
}

func httpRequestTemplate(method string, url string, body io.Reader) (*HttpFetchResponse, error) {
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

	log.Default().Println("=>", method, url)

	return &HttpFetchResponse{
		Method:      method,
		URL:         url,
		Body:        respBody,
		StatusCode:  resp.StatusCode,
		ContentType: resp.Header.Get("Content-Type"),
	}, nil
}

func Fetch(url string) (*HttpFetchResponse, error) {
	return httpRequestTemplate(http.MethodGet, url, nil)
}

func Post(url string, body io.Reader) (*HttpFetchResponse, error) {
	return httpRequestTemplate(http.MethodPost, url, body)
}

func (r *HttpFetchResponse) Plaintext() string {
	return string(r.Body)
}

func (r *HttpFetchResponse) JSON(v any) error {
	return json.Unmarshal(r.Body, v)
}
