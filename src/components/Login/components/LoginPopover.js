import * as React from "react";
import Popover from "@mui/material/Popover";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// React Router:
import { Link } from "react-router-dom";

//icons
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PaymentIcon from "@mui/icons-material/Payment";

export default function LoginPopover({ anchorEl, setAnchorEl }) {
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Login as Admin" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/log-in" onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Login as User" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              /* service */ handleClose();
            }}
          >
            <ListItemIcon>
              <RoomServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Login as Service Provider" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              /* payment */ handleClose();
            }}
          >
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Login as Payment Manager" />
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
}
