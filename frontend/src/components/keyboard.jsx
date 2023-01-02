import { Button } from '@mui/material';
import { Grid } from '@mui/material';


const buttonStyle = {
  minWidth: "90%",
  maxWidth: "100%",
  height: "80%",
}

const itemStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "60px",
  display: "flex",
}

function Keyboard(props) {
 
  const createButton = (value) => {
    let color = "primary"
    if (value == "ok") {
      color = "success"
    }
    if (value == "<") {
      color = "secondary"
    }
    return (
      <Grid key={value} style={itemStyle} item xs={4}>
        <Button style={buttonStyle} disabled={props.guess.includes(value)} variant="contained" disableElevation color={color} onClick={() => props.buttonOnClick(value)}>
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
