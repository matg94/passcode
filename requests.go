package main

type GuessRequest struct {
	Guess     []int  `json:"guess"`
	SessionID string `json:"sessionID"`
}

type GuessResponse struct {
	Result    []string
	Completed bool
}

type ParsedGuess struct {
	Guess  []int
	Result []string
}
