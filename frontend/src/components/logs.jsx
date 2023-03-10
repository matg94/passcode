import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import InputTiles from './inputtiles';

const containerDivStyle = {
    width: "100%",
    height: "100%",
  }

function Logs(props) {

    const slots = [0, 1, 2, 3, 4]

    return (
        <Grid container alignItems="center" justifyContent="center" style={containerDivStyle}>
            {slots.map((i) => {
                let result = props.logs[i] ? props.logs[i].result : ["normal", "normal", "normal", "normal", "normal", "normal"]
                let guess = props.logs[i] ? props.logs[i].guess : []
                return <Grid item xs={12}><InputTiles 
                    guessResult={result}
                    guess={guess}
                /></Grid>
            })}
            <div style={{display: "flex", justifyContent: "center", width: "100%"}} >
                <Button style={{width: "33%"}} onClick={props.onExit} disableElevation variant="contained" color="success">Exit</Button>
            </div>

        </Grid>
    );
}

export default Logs;
