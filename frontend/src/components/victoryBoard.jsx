import { Button } from '@mui/material';
import { Grid, Card } from '@mui/material';
import InputTiles from './inputtiles'
import Keyboard from './keyboard'


const containerDivStyle = {
  width: "90%",
  height: "100%",
}

const statisticsStyle = {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  background: "#504945",
}

function VictoryBoard(props) {

  return (
      <Grid container alignItems="center" justifyContent="center" style={containerDivStyle}>
        <Grid item xs={12}>
          <InputTiles guessResult={["correct", "correct", "correct", "correct", "correct", "correct"]} guess={props.passcode}></InputTiles>
        </Grid>
        <Grid item xs={12}>
          <Card style={statisticsStyle}>
            <h2>You won!</h2>
            <h3>Attempts: {props.attempts}</h3>
            <Button style={{width: "95%", margin: "15px"}} onClick={props.setShowingLogs} disableElevation variant="outlined" color="success">Logs</Button>
          </Card>
        </Grid>
        <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "30px"}} >
            <Button style={{width: "33%"}} onClick={props.onExit} disableElevation variant="contained" color="success">Main Menu</Button>
        </div>  
      </Grid>
  );
}

export default VictoryBoard;
