import {useState} from 'react';
import axios from 'axios';
import Logs from './logs'
import PasscodeBoard from './passcodeboard';
import { useEffect } from 'react';
import uuid from 'react-uuid';


const containerDivStyle = {
  width: "90%",
  height: "100%",
}

function GameBoard(props) {

  const [currentGuess, setCurrentGuess] = useState(["_", "_", "_", "_"])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastGuessResult, setLastGuessResult] = useState(["normal", "normal", "normal", "normal"])
  const [showingLogs, setShowingLogs] = useState(false);
  const [lastFiveLogs, setLastFiveLogs] = useState([]);
  const [sessionID, setSessionID] = useState("");
  
  const userID = uuid()

  useEffect(() => {
    if (sessionID == "") {
      axios
        .post("http://localhost:8080/create-game", {},
          {
            headers: {
              'X-User-ID': userID,
              'Content-Type': "application/json",
            }
          })
        .then(res => {
          setSessionID(res.data)
        })
    }
  }, [])

  const onSubmitGuess = () => {
    console.log(sessionID)
    axios
      .post("http://localhost:8080/check-guess", {
        "guess": currentGuess,
        "sessionID": sessionID
      })
      .then(res => {
        setLastGuessResult(res.data.Result)
        logGuess(currentGuess, res.data.Result)
      })
  }

  const logGuess = (guess, result) => {
    let newLogs = lastFiveLogs
    if (lastFiveLogs.length >= 5) {
      newLogs.shift()
    }
    newLogs.push({
      guess: guess,
      result: result
    })
    setLastFiveLogs(newLogs)
    console.log(newLogs)
  }

  
  const clearGuess = () => {
    setCurrentGuess(["_", "_", "_", "_"])
    setCurrentIndex(0)
    setLastGuessResult((["normal", "normal", "normal", "normal"]))
  }

  const buttonOnClick = (value) => {
    console.log(currentGuess)
    if (value == "ok") {
      if (currentIndex != 4) {
        return
      }
      onSubmitGuess()
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

  const displayLogs = () => {
    return <Logs 
        onExit={() => setShowingLogs(false)}
        logs={lastFiveLogs}
      />
  }

  const displayGameBoard = () => {
    return <PasscodeBoard 
          lastGuessResult={lastGuessResult}
          clearGuess={clearGuess}
          currentGuess={currentGuess}
          setShowingLogs={() => setShowingLogs(true)}
          onExit={props.onExit}
          buttonOnClick={buttonOnClick}
        />
  }

  if (showingLogs) {
    return displayLogs()
  }
  return displayGameBoard()
}

export default GameBoard;
