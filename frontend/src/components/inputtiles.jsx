import { Card, Box, Grid } from '@mui/material';
import NumberInputBox from './numberinputbox';


function InputTiles(props) {

  return (
    <Grid container justifyContent="center" alignItems="center">
      <NumberInputBox state={props.guessResult[0]} value={props.guess[0]}/>
      <NumberInputBox state={props.guessResult[1]} value={props.guess[1]}/>
      <NumberInputBox state={props.guessResult[2]} value={props.guess[2]}/>
      <NumberInputBox state={props.guessResult[3]} value={props.guess[3]}/>
      <NumberInputBox state={props.guessResult[4]} value={props.guess[4]}/>
      <NumberInputBox state={props.guessResult[5]} value={props.guess[5]}/>
    </Grid>
  );
}

export default InputTiles;
