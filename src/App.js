import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import BookRoom from "./components/bookingRoom/components/BookRoomPage";
import { AppBar, Toolbar, Typography, Tooltip } from "@mui/material";
import LoginBehavior from "./components/login/components/LoginBehavior";
import UserReservationPage from "./components/userReservation/components/UserReservationPage";
import LoginPage from "./components/login/components/LoginPage";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ServiceManagementPage from "./components/serviceManagement/components/ServiceManagementPage";
import AdminRequests from "./components/admin/components/AdminRequests";
import AdminReservations from "./components/admin/components/AdminReservations";
import PaymentManagement from "./components/paymentManagement/components/PaymentManagement";

//icons
import BedIcon from "@mui/icons-material/Bed";
import AdminPayments from "./components/admin/components/AdminPayments";

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
                  pl: 11,
                }}
              >
                NIAS HOTEL
              </Typography>
              <Tooltip title="Reservation Page">
                <IconButton component={Link} to="/booking">
                  <BedIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <LoginBehavior />
            </Toolbar>
          </AppBar>
          <Toolbar />

          <Routes>
            <Route path="/" element={<Navigate to="/booking" replace />} />

            <Route path="/booking" element={<BookRoom />} />
            <Route path="/user-reservation" element={<UserReservationPage />} />
            <Route path="/admin-requests" element={<AdminRequests />} />
            <Route path="/admin-reservations" element={<AdminReservations />} />
            <Route path="/admin-payments" element={<AdminPayments />} />
            <Route
              path="/service-management"
              element={<ServiceManagementPage />}
            />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/payment-management" element={<PaymentManagement />} />

            <Route path="*" element={<Navigate to="/booking" replace />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
