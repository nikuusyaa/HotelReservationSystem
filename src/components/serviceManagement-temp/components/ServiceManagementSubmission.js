import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { useCancelRequest } from "../hooks/useCancelRequest";
import { useConfirmRequest } from "../hooks/useConfirmRequest";
import CustomSnackbar from "../../CustomSnackbar";
import { useState } from "react";

//icons
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function ServiceManagementSubmission({ requestID, refetch }) {
  const { postRequest } = useConfirmRequest();
  const { deleteRequest } = useCancelRequest();
  const [snackbarOPen, setSnackbarOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await postRequest(requestID, { foo: "bar" });
      refetch();
    } catch (e) {
      setSnackbarOpen(true);
    }
  };

  const handleCancel = async () => {
    try {
      await deleteRequest(requestID);
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
        text="Failed to update Request status"
        severity="error"
      />
    </Stack>
  );
}
