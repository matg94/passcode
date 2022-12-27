package main

import (
	"reflect"
	"testing"
)

func TestCheckGuess(t *testing.T) {
	// Define test cases.
	tests := []struct {
		guess       Code
		passcode    Code
		expectedRes []string
	}{
		{
			guess:       Code{Values: []int{1, 2, 3, 4}},
			passcode:    Code{Values: []int{1, 2, 3, 4}},
			expectedRes: []string{"correct", "correct", "correct", "correct"},
		},
		{
			guess:       Code{Values: []int{4, 3, 2, 1}},
			passcode:    Code{Values: []int{1, 2, 3, 4}},
			expectedRes: []string{"incorrect_location", "incorrect_location", "incorrect_location", "incorrect_location"},
		},
		{
			guess:       Code{Values: []int{1, 5, 3, 4}},
			passcode:    Code{Values: []int{1, 2, 3, 4}},
			expectedRes: []string{"correct", "incorrect", "correct", "correct"},
		},
		{
			guess:       Code{Values: []int{5, 6, 7, 8}},
			passcode:    Code{Values: []int{1, 2, 3, 4}},
			expectedRes: []string{"incorrect", "incorrect", "incorrect", "incorrect"},
		},
	}

	for _, test := range tests {
		res := CheckGuess(test.guess, test.passcode)
		if !reflect.DeepEqual(res, test.expectedRes) {
			t.Errorf("expected results to be %s but got %s", test.expectedRes, res)
		}
	}
}

func TestValidateGuess(t *testing.T) {
	tests := []struct {
		guess       Code
		expectedRes bool
	}{
		{
			guess:       Code{Values: []int{1, 2, 3, 4}},
			expectedRes: true,
		},
		{
			guess:       Code{Values: []int{1, 1, 3, 4}},
			expectedRes: false,
		},
		{
			guess:       Code{Values: []int{0, 1, 2, 3, 4}},
			expectedRes: false,
		},
		{
			guess:       Code{Values: []int{1, 22, 3, 4}},
			expectedRes: false,
		},
		{
			guess:       Code{Values: []int{00, 1, 2, 3, 4}},
			expectedRes: false,
		},
	}

	for _, test := range tests {
		res := ValidateGuess(test.guess)
		if !reflect.DeepEqual(res, test.expectedRes) {
			t.Errorf("expected results to be %t but got %t", test.expectedRes, res)
		}
	}
}
