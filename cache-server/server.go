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
	allowedURLOrigins := getEnvWithFallback("SE_CACHE_SERVER_CORS_ALLOWED_DOMAINS", "http://localhost:3000")

	e := echo.New()

	e.Use(
		middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins:     strings.Split(allowedURLOrigins, ","),
			AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
			AllowCredentials: true,
		}),
		middleware.TimeoutWithConfig(middleware.TimeoutConfig{
			Timeout: 25 * time.Second,
		}),
		middleware.RemoveTrailingSlashWithConfig(middleware.TrailingSlashConfig{
			RedirectCode: http.StatusPermanentRedirect,
		}),
		func(next echo.HandlerFunc) echo.HandlerFunc {
			return func(c echo.Context) error {
				c.Response().Header().Set("X-Made-With", "Ulol")
				return next(c)
			}
		},
	)

	// Routes

	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pong")
	})

	e.GET("/status", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{})
	})

	// Returns the total cached values, truncated of course
	e.GET("/cache", func(c echo.Context) error {
		// just return a success status, too lazy to setup redis atm
		return c.NoContent(http.StatusOK)
	})

	// Channel cache routes
	// Channel routes should always be the channel ID, not a handle or the username

	e.GET("/channel/:id", func(c echo.Context) error {
		prettifyOutput, prettyErr := strconv.ParseBool(c.Param("prettify"))
		if prettyErr != nil {
			log.Fatal("Something went wrong converting `prettifyOutput` to type `bool`")
		}

		// Temporary fix for unused variable
		log.Print(prettifyOutput)

		return c.JSON(http.StatusOK, CachedChannelMeta{})
	})
	e.POST("/channel/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, CachedChannelMeta{})
	})
	e.PATCH("/channel/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, CachedChannelMeta{})
	})
	e.DELETE("/channel/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, CachedChannelMeta{})
	})

	// Video cache routes

	e.GET("/video/:id", func(c echo.Context) error {
		prettifyOutput, prettyErr := strconv.ParseBool(c.Param("prettify"))
		if prettyErr != nil {
			log.Fatal("Something went wrong converting `prettifyOutput` to type `bool`")
		}

		// Temporary fix for unused variable
		log.Print(prettifyOutput)

		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})
	e.POST("/video/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})
	e.PATCH("/video/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})
	e.DELETE("/video/:id", func(c echo.Context) error {
		return c.JSON(http.StatusOK, CachedVideoMeta{})
	})

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
