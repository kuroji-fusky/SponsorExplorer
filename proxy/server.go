package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
	"github.com/kuroji-fusky/SponsorExplorer/proxy/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/redis/go-redis/v9"
)

const ENV_FILE_PATH = "../.env"

func main() {
	// localEnv stuff
	localEnv := envManager()

	allowedURLOrigins := localEnv.loadWithFallback("SE_CACHE_SERVER_CORS_ALLOWED_DOMAIN", "http://localhost:5173")
	serverPort := localEnv.loadWithFallbackInt("SE_SERVER_PORT", 4000)

	ytToken := localEnv.load("YT_API_KEY")

	if ytToken == "" {
		fmt.Println(
			"Oh sweet cheese and crackers! Looks like the proxy server can't start because\n" +
				"no YouTube API key is provided in the .env file. To obtain one:\n ")
		fmt.Println(
			"1. Create project from https://console.cloud.google.com\n\n" +
				"2. Enable https://console.cloud.google.com/apis/library/youtube.googleapis.com\n\n" +
				"3. Once enabled, go to the Credentials tab > 'Create credentials' > 'API key'\n\n" +
				"4. Under 'API restrictions', select 'Restrict key', tick 'YouTube Data API v3',\n" +
				"   then create the key\n\n" +
				"5. Copy the API key shown and add them from the .env file, labeled as \n" +
				"   'YT_API_KEY=XXXXXXXXXX' and re-run the server.\n ")

		panic("no YouTube API key found")
	}

	// init redis
	cacheDb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	defer cacheDb.Close()

	// server stuff
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

		// Redis and API key
		func(next echo.HandlerFunc) echo.HandlerFunc {
			return func(c echo.Context) error {
				c.Set("redis", cacheDb)
				c.Set("yt-token", ytToken)

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

	parsedPortAddr := ":" + strconv.Itoa(serverPort)

	go func() {
		if err := e.Start(parsedPortAddr); err != nil && err != http.ErrServerClosed {
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

// env things, don't touch

type envManagerPass struct {
	Contents map[string]string
}

func envManager() *envManagerPass {
	envPile, err := godotenv.Read(ENV_FILE_PATH)

	if err != nil {
		panic(err)
	}

	return &envManagerPass{
		Contents: envPile,
	}
}

func (e *envManagerPass) load(envKey string) string {
	key := e.Contents[envKey]

	return key
}

func (e *envManagerPass) loadWithFallback(envKey string, fallback string) string {
	key := e.Contents[envKey]

	if key == "" {
		return fallback
	}

	return key
}

func (e *envManagerPass) loadWithFallbackInt(envKey string, fallback int) int {
	key := e.Contents[envKey]

	if key == "" {
		return fallback
	}

	keyInt, _ := strconv.Atoi(key)

	return keyInt
}
