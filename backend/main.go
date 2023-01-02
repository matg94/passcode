package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	databaseURL := os.Getenv("DATABASE_URL")
	tmpConn, err := NewMongoDBConnection(databaseURL)
	if err != nil {
		panic(fmt.Sprintf("Could not connect to database: %s", err))
	}
	conn = tmpConn
	SetupServer()
}

func SetupServer() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowHeaders = append(config.AllowHeaders, "X-User-ID")
	config.AllowAllOrigins = true
	router.Use(cors.New(config))
	router.POST("/check-guess", PostCheckGuess)
	router.POST("/create-game", PostCreateGame)
	router.GET("/game-state/:sessionID", GetGameSessionState)
	router.GET("/guesses/:sessionID", GetGuesses)
	router.Run()
}
