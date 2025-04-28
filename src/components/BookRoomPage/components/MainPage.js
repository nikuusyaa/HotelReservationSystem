import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import BookRoom from "./BookRoom";

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
            Rooms
          </Button>
          <Button
            color="inherit"
            onClick={() => (window.location.href = "/reserve-service")}
          >
            Services
          </Button>
          <Button
            color="inherit"
            onClick={() => (window.location.href = "/make-payment")}
          >
            Payments
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
