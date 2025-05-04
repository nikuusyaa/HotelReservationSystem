import { IconButton, Tooltip } from "@mui/material";

//icons
import AddIcon from "@mui/icons-material/Add";

export default function RequestButton() {
  return (
    <Tooltip title="Create New Request">
      <IconButton sx={{ color: "white" }}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}
