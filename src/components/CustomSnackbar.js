import { Alert, Snackbar } from "@mui/material";

export default function CustomSnackbar({
  openSnackbar,
  setOpenSnackbar,
  text,
  severity,
}) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ mt: 8 }}
    >
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
