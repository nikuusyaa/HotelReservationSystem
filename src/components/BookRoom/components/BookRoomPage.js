import React from "react";
import { Box } from "@mui/material";
import BookRoom from "./BookRoom";

export default function BookRoomPage() {
  return (
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
  );
}
