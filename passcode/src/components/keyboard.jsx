import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import {useState} from 'react';
import GameBoard from './gameboard'
import NumberInputBox from './numberinputbox';


const buttonStyle = {
  width: "50px",
  height: "40px",
}

const itemStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "50px",
  width: "50px",
  display: "flex",
}


function Keyboard(props) {

 
  const createButton = (value) => {
    let color = value == "<" || value == "ok" ? "secondary" : "primary"
    return (
      <Grid style={itemStyle} item xs={4}>
        <Button style={buttonStyle} variant="contained" disableElevation color={color} onClick={() => props.buttonOnClick(value)}>
          {value}
        </Button>
    </Grid>
    )
  }

  const buttons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, "<", 0, "ok"
  ]

  return (
    <Grid container>
      {buttons.map(createButton)}
    </Grid>
  );
}

export default Keyboard;
