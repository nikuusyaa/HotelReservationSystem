import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

export default function CreateReservationButton({
  setClicked,
  disabled,
  onClick,
  clicked,
}) {
  return (
    <Box padding="10px">
      <Button
        disabled={disabled || clicked}
        variant="contained"
        sx={{
          fontWeight: 600,

          "&.Mui-disabled": {
            bgcolor: (theme) => theme.palette.primary.light,
            opacity: 0.6,
          },
        }}
        onClick={() => {
          setClicked(true);
          onClick();
        }}
      >
        RESERVE
      </Button>
    </Box>
  );
}
