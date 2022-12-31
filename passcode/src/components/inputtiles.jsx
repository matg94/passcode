import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import {useState} from 'react';
import GameBoard from './gameboard'
import NumberInputBox from './numberinputbox';


function InputTiles(props) {

  return (
    <Grid container justifyContent="center" alignItems="center">
      <NumberInputBox state={props.guessResult[0]} value={props.guess[0]}/>
      <NumberInputBox state={props.guessResult[1]} value={props.guess[1]}/>
      <NumberInputBox state={props.guessResult[2]} value={props.guess[2]}/>
      <NumberInputBox state={props.guessResult[3]} value={props.guess[3]}/>
    </Grid>
  );
}

export default InputTiles;
