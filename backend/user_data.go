package main

type UserData struct {
	UserID       string `bson:"user_id"`
	TotalGames   int    `bson:"total_games"`
	TotalGuesses int    `bson:"total_guesses"`
	MinGuesses   int    `bson:"min_gueses"`
	MaxGuesses   int    `bson:"max_guesses"`
}
