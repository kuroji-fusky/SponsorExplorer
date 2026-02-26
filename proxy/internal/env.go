package internal

import (
	"strconv"

	"github.com/joho/godotenv"
)

type envManagerPass struct {
	contents map[string]string
}

func EnvManager(path string) *envManagerPass {
	envFile, err := godotenv.Read(path)

	if err != nil {
		panic(err)
	}

	return &envManagerPass{
		contents: envFile,
	}
}

func (e *envManagerPass) Load(envKey string) string {
	key := e.contents[envKey]

	return key
}

func (e *envManagerPass) LoadWithFallback(envKey string, fallback string) string {
	key := e.contents[envKey]

	if key == "" {
		return fallback
	}

	return key
}

func (e *envManagerPass) LoadWithFallbackInt(envKey string, fallback int) int {
	key := e.contents[envKey]

	if key == "" {
		return fallback
	}

	keyInt, _ := strconv.Atoi(key)

	return keyInt
}
