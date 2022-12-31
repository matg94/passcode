import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import {useState} from 'react';
import GameBoard from './gameboard'

const colors = {
  red: "#cc241d",
  yellow: "#d79921",
  green: "#98971a",
  normal: "#504945"
}

const numberStyle = {
    textAlign: "center",
    fontSize: "clamp(16px, 6vw, 32px)"
}

function NumberInputBox(props) {

  let boxStyle = {
    minWidth: "30px",
    maxWidth: "40px",
    minHeight: "20px",
    maxHeight: "40px",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    padding: "17px",
    display: "flex",
  }

  const getColor = (state) => {
    switch(state) {
      case "correct":
        return colors.green
      case "incorrect":
        return colors.red
      case "incorrect_location":
        return colors.yellow
      default:
        return colors.normal
    }
  }

  boxStyle.background = getColor(props.state)

  return (
    <Card style={boxStyle}>
        <h1 style={numberStyle}>{props.value ? props.value : "_"}</h1>
    </Card>
  );
}

export default NumberInputBox;
