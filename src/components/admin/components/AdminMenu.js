import { IconButton, ListItemButton, Popover, Typography } from "@mui/material";

import { useState } from "react";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import PaymentIcon from "@mui/icons-material/Payment";
import HotelIcon from "@mui/icons-material/Hotel";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import { Stack } from "@mui/system";
import { blueGrey } from "@mui/material/colors";

export default function AdminMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton sx={{ color: blueGrey[900] }}>
        <MenuIcon
          sx={{ fontSize: 30 }}
          variant="contained"
          onClick={handleClick}
        />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack alignItems="flex-start">
          <ListItemButton sx={{ width: "100%", color: blueGrey[800] }}>
            <PaymentIcon />
            <Typography fontSize={15} fontWeight={600}>
              View Payments
            </Typography>
          </ListItemButton>

          <ListItemButton sx={{ width: "100%", color: blueGrey[800] }}>
            <HotelIcon />
            <Typography fontSize={15} fontWeight={600}>
              View Reservations
            </Typography>
          </ListItemButton>
          <ListItemButton sx={{ width: "100%", color: blueGrey[800] }}>
            <RoomServiceIcon />
            <Typography fontSize={15} fontWeight={600}>
              View Services Requests
            </Typography>
          </ListItemButton>
        </Stack>
      </Popover>
    </>
  );
}
