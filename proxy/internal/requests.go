package internal

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type fetchResponse struct {
	Body       io.ReadCloser
	StatusCode int
}

func requestTemplate(method string, url string, body io.Reader) *fetchResponse {
	req, err := http.NewRequest(method, url, body)
	req.Header.Add("User-Agent", "For SponsorExplorer caching")

	if err != nil {
		log.Fatalf("Error getting request: %v", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatalf("Error parsing response: %v", err)
	}

	defer resp.Body.Close()

	return &fetchResponse{
		Body:       resp.Body,
		StatusCode: resp.StatusCode,
	}
}

func FetchMeDaddy(url string) *fetchResponse {
	return requestTemplate(http.MethodGet, url, nil)
}

func PostMeDaddy(url string, body io.Reader) *fetchResponse {
	res, err := http.Post(url, "application/json", body)

	if err != nil {
		log.Fatalln(err)
	}

	return &fetchResponse{
		Body:       res.Body,
		StatusCode: res.StatusCode,
	}
}

func (r *fetchResponse) Plaintext() string {
	body, _ := io.ReadAll(r.Body)

	return string(body)
}

func (r *fetchResponse) JSON() string {
	body, _ := json.Marshal(r.Body)

	return string(body)
}
