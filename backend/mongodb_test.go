package main

import (
	"context"
	"reflect"
	"testing"
	"time"
)

const (
	username = "passcode"
	password = "passcode"
	baseUrl  = "192.168.50.155"
)

func TestMongoDBConnection(t *testing.T) {

	conn, err := NewMongoDBConnection(username, password, baseUrl)
	if err != nil {
		t.Errorf("Error creating MongoDBConnection: %v", err)
	}

	// Test the TestConnection method.
	err = conn.TestConnection()
	if err != nil {
		t.Errorf("Error testing connection: %v", err)
	}

	// Test the SaveGameSession and GetGameSession methods.
	sessionID := "abc123"
	passcode := Code{Values: []int{1, 2, 3, 4}}
	session := &GameSession{
		SessionID: sessionID,
		Completed: false,
		Passcode:  passcode,
		Guesses:   []Code{},
	}
	err = SaveGameSession(conn, session)
	if err != nil {
		t.Errorf("Error saving game session: %v", err)
	}

	retrievedSession, err := GetGameSession(conn, sessionID)
	if err != nil {
		t.Errorf("Error getting game session: %v", err)
	}
	if retrievedSession.SessionID != sessionID {
		t.Errorf("Expected retrieved session ID to be %q, got %q", sessionID, retrievedSession.SessionID)
	}
	if retrievedSession.Completed != false {
		t.Errorf("Expected retrieved session completed flag to be false, got true")
	}
	if !reflect.DeepEqual(retrievedSession.Passcode, passcode) {
		t.Errorf("Expected retrieved session passcode to be %v, got %v", passcode, retrievedSession.Passcode)
	}
	if len(retrievedSession.Guesses) != 0 {
		t.Errorf("Expected retrieved session guesses slice to be empty, got %v", retrievedSession.Guesses)
	}

	err = DeleteGameSession(conn, sessionID)
	if err != nil {
		t.Errorf("Error deleting game session: %v", err)
	}

	// Close the connection after the test is done.
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	err = conn.client.Disconnect(ctx)
	if err != nil {
		t.Errorf("Error closing connection: %v", err)
	}
}
