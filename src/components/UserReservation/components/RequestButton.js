import { IconButton, Popover, Tooltip } from "@mui/material";
import { useState } from "react";

//icons
import AddIcon from "@mui/icons-material/Add";
import ServicesList from "./ServicesList";

export default function RequestButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title="Book Services">
        <IconButton
          sx={{ color: "white" }}
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
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
        <ServicesList></ServicesList>
      </Popover>
    </>
  );
}
