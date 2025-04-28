import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import BookRoom from "./BookRoom";

//icons
import BedIcon from "@mui/icons-material/Bed";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PaymentIcon from "@mui/icons-material/Payment";

const MainPage = () => {
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

          <Button
            color="inherit"
            onClick={() => (window.location.href = "/reserve-room")}
          >
            <Tooltip title="Rooms">
              <BedIcon />
            </Tooltip>
          </Button>
          <Button
            color="inherit"
            onClick={() => (window.location.href = "/reserve-service")}
          >
            <Tooltip title="Services">
              <RoomServiceIcon />
            </Tooltip>
          </Button>
          <Button
            color="inherit"
            onClick={() => (window.location.href = "/make-payment")}
          >
            <Tooltip title="Payments">
              <PaymentIcon />
            </Tooltip>
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box
        sx={{
          display: "flex",
          pt: 4,
          px: { xs: 2, md: 6 },
        }}
      >
        <Box sx={{ flex: 1, mr: { xs: 0, md: 4 } }}>
          <BookRoom />
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
