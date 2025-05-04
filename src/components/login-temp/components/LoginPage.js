import { Box, Stack } from "@mui/system";
import BookRoomPhoneField from "../../bookingRoom/components/BookRoomPhoneField";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import CustomButton from "../../CustomButton";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import CustomSnackbar from "../../CustomSnackbar";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const { login, loading } = useLogin();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(phone);
      navigate("/user-reservation");
    } catch {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      bgcolor={grey[800]}
      borderRadius={5}
      sx={{ boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.5)" }}
    >
      <Typography fontSize={25} fontWeight={900} pt={2} align="center">
        Log in to User Section
      </Typography>
      <Stack p={10} pt={3} spacing={2}>
        <BookRoomPhoneField phone={phone} setPhone={setPhone} />

        <CustomButton
          type="submit"
          onClick={handleSubmit}
          disabled={phone.length !== 9 || loading}
        />
      </Stack>
      <CustomSnackbar
        openSnackbar={snackbarOpen}
        setOpenSnackbar={setSnackbarOpen}
        text="Failed to Log in"
        severity="error"
      />
    </Box>
  );
}
