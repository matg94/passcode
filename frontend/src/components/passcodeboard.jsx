import { Button } from '@mui/material';
import { Grid, Card } from '@mui/material';
import InputTiles from './inputtiles'
import Keyboard from './keyboard'


const containerDivStyle = {
  width: "100%",
  height: "100%",
}

function PasscodeBoard(props) {

  return (
      <Grid container alignItems="center" justifyContent="center" style={containerDivStyle}>
        <Grid item xs={12}>
          <InputTiles guessResult={props.lastGuessResult} guess={props.currentGuess}></InputTiles>
        </Grid>
        <Grid item xs={3}/>
        <Grid item xs={3} style={{display: "flex"}} justifyContent="center">
            <Button style={{width: "95%"}} onClick={props.clearGuess} disableElevation variant="outlined" color="error">Clear</Button>
        </Grid>
        <Grid item xs={3} style={{display: "flex"}} justifyContent="center">
            <Button style={{width: "95%"}} onClick={props.setShowingLogs} disableElevation variant="outlined" color="success">Logs</Button>
        </Grid>
        <Grid item xs={3}/>
        <Grid item xs={12}/>
        <Grid item xs={8}>
          <Keyboard guess={props.currentGuess} buttonOnClick={props.buttonOnClick}></Keyboard>
        </Grid>
        <div style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "30px"}} >
            <Button style={{width: "33%"}} onClick={props.onExit} disableElevation variant="contained" color="success">Exit</Button>
        </div>  
      </Grid>
  );
}

export default PasscodeBoard;
