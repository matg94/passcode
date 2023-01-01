import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import {useState} from 'react';
import GameBoard from './gameboard'

const textStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%"
}

function GameTile() {

  const [gameStarted, setGameStarted] = useState(false);

  const mainMenu = () => {
    return (
      <Grid container alignItems="top">
        <Grid item xs={12}>
          <div style={textStyle} >
              <h2>Find the correct Passcode</h2>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "100px"}} >
            <Button 
                variant="contained" 
                disableElevation 
                color="secondary" 
                onClick={() => setGameStarted(true)}
              >
                Start New Game
              </Button>
            </div>
          </Grid>
        </Grid>
    );
  }

  return (
    gameStarted ?
      <GameBoard onExit={() => setGameStarted(false)} sessionID={123}/>
      : mainMenu()
  );
}

export default GameTile;
