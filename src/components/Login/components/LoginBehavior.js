import {  Tooltip } from "@mui/material";
import LoginPopover from "./LoginPopover";
import { useState } from "react";
import React from "react";
import IconButton from "@mui/material/IconButton";

//icons
import LoginIcon from "@mui/icons-material/Login";

export default function LoginBehavior() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Tooltip title="Login">
        <IconButton color="inherit" onClick={handleClick}>
          <LoginIcon />
        </IconButton>
      </Tooltip>
      {anchorEl && (
        <LoginPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      )}
    </>
  );
}
