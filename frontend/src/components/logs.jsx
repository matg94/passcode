import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import InputTiles from './inputtiles';

const containerDivStyle = {
    width: "90%",
    height: "100%",
  }

function Logs(props) {

    const slots = [0, 1, 2, 3, 4]

    return (
        <Grid container alignItems="center" justifyContent="center" style={containerDivStyle}>
            {slots.map((i) => {
                let result = props.logs[i] ? props.logs[i].result : ["normal", "normal", "normal", "normal"]
                let guess = props.logs[i] ? props.logs[i].guess : ["_", "_", "_", "_"]
                return <InputTiles 
                    guessResult={result}
                    guess={guess}
                />
            })}
            <div style={{display: "flex", justifyContent: "center", width: "100%"}} >
                <Button style={{width: "33%"}} onClick={props.onExit} disableElevation variant="contained" color="success">Exit</Button>
            </div>  
        </Grid>
    );
}

export default Logs;
