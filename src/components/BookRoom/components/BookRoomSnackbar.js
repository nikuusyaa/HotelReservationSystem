import { Alert, Snackbar } from "@mui/material";

export default function BookRoomSnackbar({ openSnackbar, setOpenSnackbar }) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        Thank you! Your reservation is created successfully!
      </Alert>
    </Snackbar>
  );
}
