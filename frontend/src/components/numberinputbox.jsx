import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import {useState} from 'react';
import GameBoard from './gameboard'

const colors = {
  red: "#cc241d",
  yellow: "#d79921",
  green: "#98971a",
  normal: "#504945",
  light_foreground: "#fbf1c7",
  dark_foreground: "#1d2021"
}

const numberStyle = {
    textAlign: "center",
    padding: "2px",
    fontSize: "clamp(16px, 6vw, 32px)",
}

function NumberInputBox(props) {

  let boxStyle = {
    minWidth: "15px",
    maxWidth: "25px",
    minHeight: "15px",
    maxHeight: "25px",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
    marginTop: "20px",
    marginBottom: "10px",
    padding: "15px",
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

  const getFontColor = (state) => {
    console.log(state)
    if (state == "normal") {
      return colors.light_foreground
    }
    return colors.dark_foreground
  }

  boxStyle.background = getColor(props.state)
  boxStyle.color = getFontColor(props.state)  

  return (
    <Card style={boxStyle}>
        <h1 style={numberStyle}>{props.value || props.value == 0 ? props.value : "_"}</h1>
    </Card>
  );
}

export default NumberInputBox;
