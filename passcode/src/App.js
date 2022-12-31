import './App.css';
import Passcode from './components/passcode';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#d79921'
    },
    secondary: {
      main: '#d65d0e'
    },
    background: {
      paper: "#3c3836"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Passcode/>
    </ThemeProvider>
  );
}

export default App;
