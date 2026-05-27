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

	"github.com/kuroji-fusky/SponsorExplorer/proxy/internal"
	"github.com/kuroji-fusky/SponsorExplorer/proxy/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/redis/go-redis/v9"
)

func main() {
	localEnv := internal.EnvManager("../.env")

	allowedURLOrigins := localEnv.LoadWithFallback("SE_CACHE_SERVER_CORS_ALLOWED_DOMAIN", "http://localhost:5173")
	serverPort := localEnv.LoadWithFallbackInt("SE_SERVER_PORT", 4000)

	ytToken := localEnv.Load("YT_API_KEY")

	if ytToken == "" {
		log.Default().Println(
			"Oh sweet cheese and crackers! Looks like the proxy server can't start because\n" +
				"no YouTube API key is provided in the .env file. To obtain one:\n ")
		log.Default().Println(
			" 1. Create project from https://console.cloud.google.com\n\n" +
				" 2. Enable https://console.cloud.google.com/apis/library/youtube.googleapis.com\n\n" +
				" 3. Once enabled, go to the Credentials tab > 'Create credentials' > 'API key'\n\n" +
				" 4. Under 'API restrictions', select 'Restrict key', tick 'YouTube Data API v3',\n" +
				"    then create the key\n\n" +
				" 5. Copy the API key shown and add them from the .env file, labeled as \n" +
				"    'YT_API_KEY=XXXXXXXXXX' and re-run the server.\n ")

		log.Fatalf("no YouTube API key found")
	}

	// init redis
	redisAddr := localEnv.LoadWithFallback("REDIS_ADDRESS", "localhost:6379")
	redisPassword := localEnv.LoadWithFallback("REDIS_PASSWORD", "")

	cacheDb := redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: redisPassword,
		DB:       0,
	})

	redisCtx := context.Background()

	pingCtx, pingCancel := context.WithTimeout(context.Background(), 01*time.Second)
	defer pingCancel()

	if err := cacheDb.Ping(pingCtx).Err(); err != nil {
		var demLines string = strings.Repeat("-", 40)

		log.Default().Println(demLines)
		log.Default().Println("")
		log.Default().Println("TIP: Make sure Redis is running in the background!")
		log.Default().Println("")
		log.Default().Println(demLines)

		log.Fatalf("failed to connect to redis: %v", err)
	}

	defer cacheDb.Close()

	// init server
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
	)

	// Routes
	h := routes.NewDependencyHandler(routes.ProxyDeps{
		YTApiKey: ytToken,
		Redis:    cacheDb,
		RedisCtx: redisCtx,
	})

	// rdb := internal.NewRedisInstance(cacheDb, redisCtx)

	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{})
	})

	e.GET("/ping", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"message": "pong"})
	})

	e.GET("/status", func(c echo.Context) error {
		// rdb.GetTotalLogs()

		return c.JSON(http.StatusOK, map[string]any{
			"total_queries": 0,
		})
	})

	// Returns the total cached values, truncated of course
	e.GET("/cache", func(c echo.Context) error {
		maxResults, _ := strconv.Atoi(c.QueryParam("max_results"))

		// Setting the hard limit to 100
		if maxResults >= 100 {
			maxResults = 100
		}

		return c.NoContent(http.StatusOK)
	})

	h.VideoRoutes(e)
	h.ChannelRoutes(e)
	h.SBUsersRoute(e)
	h.SBProxyRoutes(e)
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
