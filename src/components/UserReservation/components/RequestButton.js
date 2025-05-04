import { IconButton, Popover, Tooltip } from "@mui/material";
import { useState } from "react";
import ServicesList from "./ServicesList";

//icons
import AddIcon from "@mui/icons-material/Add";

export default function RequestButton({ onSuccess }) {
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
        <ServicesList onSuccess={onSuccess}></ServicesList>
      </Popover>
    </>
  );
}
