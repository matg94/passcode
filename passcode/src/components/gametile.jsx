import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import {useState} from 'react';
import GameBoard from './gameboard'

function GameTile() {

  const [gameStarted, setGameStarted] = useState(false);

  return (
    gameStarted ?
      <GameBoard sessionID={123}/>
      : <Button 
          variant="contained" 
          disableElevation 
          color="secondary" 
          onClick={() => setGameStarted(true)}
          endGameFunction={() => setGameStarted(false)}
        >
          Start New Game
        </Button>
  );
}

export default GameTile;
