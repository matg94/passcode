package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var conn MongoDBConnectionInterface

// PostCheckGuess is a handler function for the "/check-guess" endpoint.
func PostCheckGuess(c *gin.Context) {

	// Read the request body.
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(400, fmt.Sprintf("Could not read request: %s", err))
		return
	}
	defer c.Request.Body.Close()

	// Parse the request body into a GuessRequest struct.
	var request GuessRequest
	err = json.Unmarshal(body, &request)
	if err != nil {
		c.JSON(400, fmt.Sprintf("Could not parse request: %s", err))
		return
	}

	// TODO: Add code to get session and check for correctness

	response := GuessResponse{
		Result: []string{"correct", "incorrect", "incorrect", "incorrect"},
	}

	c.JSON(200, response)
}

func PostCreateGame(c *gin.Context) {
	userID := c.GetHeader("X-User-ID")
	if userID == "" {
		c.JSON(400, "No UserId found")
		return
	}

	sessionID, err := uuid.NewRandom()
	if err != nil {
		c.JSON(500, "Could not generate uuid")
		return
	}

	session := GameSession{
		SessionID: sessionID.String(),
		UserID:    userID,
		Completed: false,
		Timestamp: time.Now(),
		Passcode:  Code{Values: []int{1, 2, 3, 4}},
		Guesses:   []Code{},
	}

	err = SaveGameSession(conn, &session)
	if err != nil {
		c.JSON(500, fmt.Sprintf("Failed to save session: %s", err))
	}

	c.JSON(http.StatusOK, session.SessionID)
}
