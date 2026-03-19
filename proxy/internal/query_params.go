package internal

import (
	"net/url"

	"github.com/gorilla/schema"
)

var queryEncoder = newQueryEncoder()

func newQueryEncoder() *schema.Encoder {
	encoder := schema.NewEncoder()
	encoder.SetAliasTag("query")

	return encoder
}

func BuildURLWithQuery(baseURL string, params any) string {
	values := encodeQuery(params)
	if encoded := values.Encode(); encoded != "" {
		return baseURL + "?" + encoded
	}

	return baseURL
}

func encodeQuery(params any) url.Values {
	if params == nil {
		return url.Values{}
	}

	values := url.Values{}
	if err := queryEncoder.Encode(params, values); err != nil {
		panic(err)
	}

	return values
}
