import "./App.css";
import BookRoom from "./components/BookRoom/components/BookRoomPage";
import { AppBar, Toolbar, Typography, Button, Tooltip } from "@mui/material";

//icons
import LoginIcon from "@mui/icons-material/Login";

function App() {
  return (
    <>
      <AppBar position="fixed" color="primary" elevation={4}>
        <Toolbar>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: 700,
              letterSpacing: "0.15em",
              pl: 30,
            }}
          >
            NIAS HOTEL
          </Typography>

          <Tooltip title="Login">
            <Button
              color="inherit"
              onClick={() => (window.location.href = "/login")}
            >
              <LoginIcon />
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className="App">
        <header className="App-header">
          <BookRoom />
        </header>
      </div>
    </>
  );
}

export default App;
