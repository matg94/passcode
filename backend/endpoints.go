package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"reflect"
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

	session, err := GetGameSession(conn, request.SessionID)
	if err != nil {
		c.JSON(400, fmt.Sprintf("Failed to get session: %s", err))
		return
	}

	if !ValidateGuess(Code{Values: request.Guess}) {
		c.JSON(400, "invalid guess")
		return
	}

	session.Guesses = append(session.Guesses, Code{Values: request.Guess})

	result := CheckGuess(Code{Values: request.Guess}, session.Passcode)
	if reflect.DeepEqual(result, []string{"correct", "correct", "correct", "correct"}) {
		session.Completed = true
	}

	UpdateGameSession(conn, session)

	response := GuessResponse{
		Result: result,
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
		Passcode:  Code{Values: GenerateRandomPasscode()},
		Guesses:   []Code{},
	}

	err = SaveGameSession(conn, &session)
	if err != nil {
		c.JSON(500, fmt.Sprintf("Failed to save session: %s", err))
	}

	c.JSON(http.StatusOK, session.SessionID)
}

func GetGameSessionState(c *gin.Context) {
	sessionID := c.Param("sessionID")

	session, err := GetGameSession(conn, sessionID)
	if err != nil {
		c.JSON(400, fmt.Sprintf("Failed to get session: %s", err))
		return
	}

	c.JSON(200, &session)
}

func GetGuesses(c *gin.Context) {
	sessionID := c.Param("sessionID")

	session, err := GetGameSession(conn, sessionID)
	if err != nil {
		c.JSON(400, fmt.Sprintf("Failed to get session: %s", err))
		return
	}

	var results []ParsedGuess

	for _, guess := range session.Guesses {
		results = append(results, ParsedGuess{
			Guess:  guess.Values,
			Result: CheckGuess(guess, session.Passcode),
		})
	}

	c.JSON(200, &results)
}
