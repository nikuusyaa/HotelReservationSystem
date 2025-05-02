import { Button, Tooltip } from "@mui/material";
import LoginPopover from "./LoginPopover";
import { useState } from "react";
import React from "react";

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
        <Button color="inherit" onClick={handleClick}>
          <LoginIcon />
        </Button>
      </Tooltip>
      {anchorEl && (
        <LoginPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      )}
    </>
  );
}
