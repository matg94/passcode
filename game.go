package main

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

func CheckGuess(guess Code, passcode Code) []string {
	results := make([]string, len(guess.Values))

	for i, value := range guess.Values {
		if value == passcode.Values[i] {
			results[i] = "correct"
			continue
		}

		for j, passcodeValue := range passcode.Values {
			if value == passcodeValue && i != j {
				results[i] = "incorrect_location"
				break
			}
		}

		if results[i] == "" {
			results[i] = "incorrect"
		}
	}

	return results
}

func ValidateGuess(guess Code) bool {
	// Create a map to store the count of each number.
	counts := make(map[int]int)

	if len(guess.Values) != 6 {
		return false
	}

	// Iterate through the values in the guess.
	for _, value := range guess.Values {
		str := strconv.FormatInt(int64(value), 10)
		if len(str) != 1 {
			return false
		}
		counts[value]++
	}

	// Check if any of the counts are greater than 1.
	for _, count := range counts {
		if count > 1 {
			return false
		}
	}

	return true
}

func GenerateRandomPasscode() []int {
	// Seed the random number generator with the current time
	rand.Seed(time.Now().UnixNano())

	passcode := make([]int, 6)

	for i := 0; i < 6; i++ {
		randomNumber := rand.Intn(10)

		invalidNumber := false
		for _, num := range passcode {
			if randomNumber == num {
				// go back to start
				invalidNumber = true
			}
		}
		if invalidNumber {
			i--
			continue
		}

		passcode[i] = randomNumber
	}
	fmt.Println(passcode)
	return passcode
}
