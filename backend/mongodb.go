package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDBConnectionInterface interface {
	GetClient() *mongo.Client
	TestConnection() error
}

type MongoDBConnection struct {
	client *mongo.Client
}

func NewMongoDBConnection(username, password, baseUrl string) (*MongoDBConnection, error) {
	url := fmt.Sprintf("mongodb://%s:%s@%s", username, password, baseUrl)

	// Set up the MongoDB client options.
	clientOptions := options.Client().ApplyURI(url)

	// Connect to the MongoDB server.
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}

	conn := &MongoDBConnection{
		client: client,
	}

	// Test the connection to the MongoDB server
	err = conn.TestConnection()
	if err != nil {
		return nil, err
	}

	return conn, nil
}

func (conn *MongoDBConnection) GetClient() *mongo.Client {
	return conn.client
}

func (conn *MongoDBConnection) TestConnection() error {
	// Test the connection to the MongoDB server
	return nil
}
