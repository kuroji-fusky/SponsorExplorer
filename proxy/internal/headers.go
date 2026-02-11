package internal

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// Wrapper functions for adding headers

type CustomHeaderProxy struct {
	Header http.Header
}

func ManageHeaders(ec echo.Context) *CustomHeaderProxy {
	return &CustomHeaderProxy{
		Header: ec.Response().Header(),
	}
}

func (h *CustomHeaderProxy) Etag(val string) {
	h.Header.Add("Etag", val)
}

func (h *CustomHeaderProxy) LastCachedTime(val string) {
	h.Header.Add("Last-Cached-Time", val)
}
