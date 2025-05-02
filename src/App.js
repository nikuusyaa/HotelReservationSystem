// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import BookRoom from "./components/BookRoom/components/BookRoomPage";
import { AppBar, Toolbar, Typography, Button, Tooltip } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <AppBar position="fixed" color="primary" elevation={4}>
            <Toolbar>
              <Typography
                fontSize={50}
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
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

          <Toolbar />

          <Routes>
            <Route path="/" element={<Navigate to="/booking" replace />} />

            <Route path="/booking" element={<BookRoom />} />

            <Route path="*" element={<Navigate to="/booking" replace />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
