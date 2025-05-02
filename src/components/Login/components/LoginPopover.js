import * as React from "react";
import Popover from "@mui/material/Popover";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

//icons
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PaymentIcon from "@mui/icons-material/Payment";

export default function LoginPopover({ anchorEl, setAnchorEl }) {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Login as Admin" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Login as User" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RoomServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Login as Service Provider" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
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
