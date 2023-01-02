import { Button } from '@mui/material';
import { Card, Box, Grid } from '@mui/material';
import GameTile from './gametile';

const boxStyle = {
  diplay: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 300,
  maxWidth: 500,
}

const mainCardStyle = {
  alignItems:"center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "center",
  margin: "30px",
  minWidth: 400,
  maxWidth: 450,
  height: 550
}

const titleStyle = {
  textAlign: "center",
  fontSize: "clamp(32px, 8vw, 64px)",
  color: "#d79921",
}

function Passcode() {
  return (
    <div>
      <h1 style={titleStyle}>Passcode</h1>
      <Grid container justifyContent="center">
        <Card style={mainCardStyle} variant="outlined">
          <GameTile/>
        </Card>
      </Grid>
    </div>
  );
}

export default Passcode;
