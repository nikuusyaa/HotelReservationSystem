// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import BookRoom from "./components/BookRoom/components/BookRoomPage";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LoginBehavior from "./components/Login/components/LoginBehavior";
import UserReservationPage from "./components/UserReservationPage/components/UserReservationPage";
import LoginPage from "./components/Login/components/LoginPage";

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
              <LoginBehavior />
            </Toolbar>
          </AppBar>

          <Toolbar />

          <Routes>
            <Route path="/" element={<Navigate to="/booking" replace />} />

            <Route path="/booking" element={<BookRoom />} />
            <Route path="/user-reservation" element={<UserReservationPage />} />
            <Route path="/log-in" element={<LoginPage />} />

            <Route path="*" element={<Navigate to="/booking" replace />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
