package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"time"

	"github.com/kuroji-fusky/SponsorExplorer/proxy/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func getEnvWithFallback[T any](envKey string, fallback T) T {
	key := os.Getenv(envKey)

	if key == "" {
		return fallback
	}

	switch any(fallback).(type) {
	case string:
		return any(key).(T)
	default:
		return fallback
	}
}

func main() {
	allowedURLOrigins := getEnvWithFallback("SE_CACHE_SERVER_CORS_ALLOWED_DOMAINS", "http://localhost:5173")

	e := echo.New()
	e.HideBanner = true

	e.Use(
		middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins:     strings.Split(allowedURLOrigins, ","),
			AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
			AllowCredentials: true,
		}),
		middleware.TimeoutWithConfig(middleware.TimeoutConfig{
			Timeout: 25 * time.Second,
		}),
		middleware.RemoveTrailingSlash(),
		func(next echo.HandlerFunc) echo.HandlerFunc {
			return func(c echo.Context) error {
				c.Response().Header().Set("X-Last-Server-Update", "N/A")
				return next(c)
			}
		},
	)

	// Routes

	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]any{
			"video-id":   "/video/:id{?bypass_cache}",
			"channel-id": "/channel/:id{?bypass_cache}",
		})
	})

	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pong")
	})

	e.GET("/status", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{})
	})

	// Returns the total cached values, truncated of course
	e.GET("/cache", func(c echo.Context) error {
		maxResults, _ := strconv.Atoi(c.QueryParam("max_results"))

		// Setting the hard limit to 100
		if maxResults >= 100 {
			maxResults = 100
		}

		// just return a success status, too lazy to setup redis atm
		return c.NoContent(http.StatusOK)
	})

	routes.AnalysisRoutes(e)
	routes.ChannelRoutes(e)
	routes.VideoRoutes(e)
	routes.SBUsersRoute(e)

	// Routes END

	go func() {
		if err := e.Start(":4000"); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatalf("Server failed to start: %v", err)
		}
	}()

	closeSig := make(chan os.Signal, 1)
	signal.Notify(closeSig, os.Interrupt)

	<-closeSig

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatalf("Server forced to shut down: %v", err)
	}

	log.Println("Server shut down")
}
