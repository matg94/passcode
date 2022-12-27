package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Code struct {
	Values []int `bson:"values"`
}

type GameSession struct {
	SessionID string    `bson:"session_id"`
	UserID    string    `bson:"user_id"`
	Completed bool      `bson:"completed"`
	Timestamp time.Time `bson:"timestamp"`
	Passcode  Code      `bson:"passcode"`
	Guesses   []Code    `bson:"guesses"`
}

// SaveGameSession stores a GameSession object in the MongoDB collection.
func SaveGameSession(conn MongoDBConnectionInterface, session *GameSession) error {
	// Create a context with a timeout.
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Set up the collection and insert the object.
	coll := conn.GetClient().Database("passcode").Collection("game_sessions")
	_, err := coll.InsertOne(ctx, session)
	return err
}

// GetGameSession retrieves a GameSession object from the MongoDB collection.
func GetGameSession(conn MongoDBConnectionInterface, sessionID string) (*GameSession, error) {
	// Create a context with a timeout.
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Set up the collection and find the object by ID.
	coll := conn.GetClient().Database("passcode").Collection("game_sessions")
	filter := bson.M{"session_id": sessionID}
	var result GameSession
	err := coll.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("game session not found")
		}
		return nil, err
	}

	return &result, nil
}

// DeleteGameSession deletes a GameSession object from the MongoDB collection.
func DeleteGameSession(conn *MongoDBConnection, sessionID string) error {
	// Create a context with a timeout.
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Set up the collection and delete the object by ID.
	coll := conn.client.Database("passcode").Collection("game_sessions")
	filter := bson.M{"session_id": sessionID}
	_, err := coll.DeleteOne(ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return fmt.Errorf("game session not found")
		}
		return err
	}

	return nil
}
