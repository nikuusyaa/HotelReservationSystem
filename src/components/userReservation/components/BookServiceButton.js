import React, { useState } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useAddUserService } from "../hooks/useAddService";
import { Box } from "@mui/system";
import CustomSnackbar from "../../CustomSnackbar";

//icons
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function BookServiceButton({ requestId, onSuccess }) {
  const { addUserService, loading, error } = useAddUserService();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={0}>
        <CircularProgress size="30px" />
      </Box>
    );
  }
  if (error) {
    setSnackbarOpen(true);
  }

  const handleAdd = async () => {
    try {
      await addUserService(requestId);
      onSuccess();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Tooltip title="Book this Services" placement="right" arrow>
        <IconButton color="primary" onClick={handleAdd}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <CustomSnackbar
        openSnackbar={snackbarOpen}
        setOpenSnackbar={setSnackbarOpen}
        text="Failed to Book Service"
        severity="error"
      />
    </>
  );
}
