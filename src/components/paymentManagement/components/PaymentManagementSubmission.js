import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import CustomSnackbar from "../../CustomSnackbar";
import { useState } from "react";
import { useConfirmPayment } from "../hooks/useConfirmPayment";
import { useDeletePayment } from "../hooks/useDeletePayment";

//icons
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function PaymentManagementSubmission({ paymentID, refetch }) {
  const { confirmPayment } = useConfirmPayment();
  const { deletePayment } = useDeletePayment();
  const [snackbarOPen, setSnackbarOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await confirmPayment(paymentID);
      refetch();
    } catch (e) {
      setSnackbarOpen(true);
    }
  };

  const handleCancel = async () => {
    try {
      await deletePayment(paymentID);
      refetch();
    } catch (e) {
      setSnackbarOpen(true);
    }
  };

  return (
    <Stack direction="row">
      <IconButton color="success" onClick={handleConfirm}>
        <CheckIcon />
      </IconButton>
      <IconButton color="error" onClick={handleCancel}>
        <ClearIcon />
      </IconButton>
      <CustomSnackbar
        openSnackbar={snackbarOPen}
        setOpenSnackbar={setSnackbarOpen}
        text="Failed to update Payment status"
        severity="error"
      />
    </Stack>
  );
}
