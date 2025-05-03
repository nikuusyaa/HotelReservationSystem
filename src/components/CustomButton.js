import { Button, Typography } from "@mui/material";

export default function CustomButton({ onClick, disabled, to, component }) {
  return (
    <Button
      to={to}
      component={component}
      onClick={onClick}
      variant="outlined"
      disabled={disabled}
      sx={{
        mt: 3,
        px: 3,
        py: 1.2,
        bgcolor: "common.white",
        color: "primary.main",
        borderColor: "primary.main",
        borderRadius: 2,
        textTransform: "none",
        "&:hover": {
          bgcolor: "primary.main",
          borderColor: "primary.main",
          color: "white",
        },
      }}
    >
      <Typography fontSize={18} fontWeight={900}>
        Log in
      </Typography>
    </Button>
  );
}
