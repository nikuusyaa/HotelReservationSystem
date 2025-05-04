import React, { useState } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useAddUserService } from "../hooks/useAddService";
import { Box } from "@mui/system";
import CustomSnackbar from "../../CustomSnackbar";

//icons
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function BookServiceButton({ requestId }) {
  const { addUserService, loading, error } = useAddUserService();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    setSnackbarOpen(true);
  }

  const handleAdd = async () => {
    try {
      const result = await addUserService(requestId);
      console.log("Added service:", result);
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
