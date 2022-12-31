import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import {useState} from 'react';
import InputTiles from './inputtiles'
import Keyboard from './keyboard'
import axios from 'axios';


const containerDivStyle = {
  width: "100%",
  height: "100%",
}

function GameBoard(props) {

  const [currentGuess, setCurrentGuess] = useState(["_", "_", "_", "_"])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastGuessResult, setLastGuessResult] = useState(["normal", "normal", "normal", "normal"])

  const onSubmitGuess = () => {
    axios
      .post("http://localhost:8080/check-guess", {
        "guess": currentGuess,
        "sessionID": "2563db02-b38f-4ab2-a266-f328836d8990"
      })
      .then(res => {
        setLastGuessResult(res.data.Result)
      })
  }
  
  const buttonOnClick = (value) => {
    if (value == "ok") {
      if (currentIndex != 4) {
        return
      }
      onSubmitGuess(currentGuess)
      return
    }
    
    if (value == "<") {
      if (currentIndex > 0) {
        let newGuess = currentGuess
        newGuess[currentIndex - 1] = "_"
        setCurrentGuess(newGuess)
        setCurrentIndex(currentIndex - 1)

        let newResult = lastGuessResult
        newResult[currentIndex - 1] = "normal"
        setLastGuessResult(newResult)
        return
      }
      return
    }

    if (currentIndex > 3) {
      return
    }

    let newGuess = currentGuess
    newGuess[currentIndex] = value
    setCurrentGuess(newGuess)
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <Grid container alignItems="center" justifyContent="center" style={containerDivStyle}>
      <Grid item xs={12}>
        <InputTiles guessResult={lastGuessResult} guess={currentGuess}></InputTiles>
      </Grid>
      <Grid item xs={6} alignSelf="center">
        <Keyboard buttonOnClick={buttonOnClick}></Keyboard>
      </Grid>
    </Grid>
  );
}

export default GameBoard;
