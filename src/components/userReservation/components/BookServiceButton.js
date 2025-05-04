import React from "react";
import { IconButton, Tooltip } from "@mui/material";

//icons
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function BookServiceButton() {
  return (
    <Tooltip title="Book this Services" placement="right" arrow>
      <IconButton color="primary">
        <AddCircleIcon />
      </IconButton>
    </Tooltip>
  );
}
