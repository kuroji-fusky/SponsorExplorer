package main

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"os"
	"strings"
)

const keyName = "SE_INTERNAL_API_KEY"

func main() {

	cwd, _ := os.Getwd()
	envPath := cwd + "../../.env"

	keyContents, _ := os.ReadFile(envPath)
	if strings.Contains(string(keyContents), keyName) {
		fmt.Println("Key already exists, skipping")
		return
	}

	biteMarks := make([]byte, 32)
	if _, err := rand.Read(biteMarks); err != nil {
		panic(err)
	}

	keysToYourMomsHouse := hex.EncodeToString(biteMarks)

	envFile, err := os.OpenFile(envPath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		panic(err)
	}

	defer envFile.Close()

	if _, err := fmt.Fprintf(envFile, "\n%s=\"%s\"\n", keyName, keysToYourMomsHouse); err != nil {
		panic(err)
	}

	fmt.Printf("Key generated: %s; don't lose this bitch", keysToYourMomsHouse)
}
