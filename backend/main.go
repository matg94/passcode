package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Hello")
	tmpConn, err := NewMongoDBConnection("passcode", "passcode", "192.168.50.155")
	if err != nil {
		panic(fmt.Sprintf("Could not connect to database: %s", err))
	}
	conn = tmpConn
	SetupServer()
}

func SetupServer() {
	router := gin.Default()
	router.Use(cors.Default())
	router.POST("/check-guess", PostCheckGuess)
	router.POST("/create-game", PostCreateGame)
	router.Run()
}