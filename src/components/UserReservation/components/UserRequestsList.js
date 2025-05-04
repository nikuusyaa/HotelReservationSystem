import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Stack } from "@mui/system";
import { blue, blueGrey, grey } from "@mui/material/colors";
import CustomSnackbar from "../../CustomSnackbar";
import useUserRequests from "../hooks/useUserRequests";
import RequestButton from "./RequestButton";

export default function UserRequestsList() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { requests, loading, error } = useUserRequests();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        text="Failed to load your service requests"
        severity="error"
      />
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <Typography variant="body1" align="center" mt={4} color="white">
        You have no service requests.
      </Typography>
    );
  }

  return (
    <Box mx="auto" bgcolor={grey[800]} borderRadius={5} pb={1}>
      <Stack
        direction="row"
        gap={1}
        bgcolor={blue[600]}
        p={1}
        sx={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          pr: 2,
          pl: 2,
        }}
      >
        <Typography
          fontSize={25}
          fontWeight={900}
          gutterBottom
          align="center"
          color="white"
        >
          Your Service Requests
        </Typography>
        <RequestButton />
      </Stack>

      <List>
        {requests.map((req) => (
          <React.Fragment key={req.request_id}>
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background-color 0.2s, color 0.2s",
                "&:hover": {
                  backgroundColor: blueGrey[800],
                  color: "common.white",
                },
              }}
            >
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      fontSize={22}
                      fontWeight={900}
                      color={blue[500]}
                    >
                      Request №{req.request_id}
                    </Typography>
                    <Typography fontSize={20} fontWeight={900} color="white">
                      {req.s_name}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      fontSize={22}
                      fontWeight={900}
                      color={blue[500]}
                    >
                      Price:
                    </Typography>
                    <Typography fontSize={20} fontWeight={900} color="white">
                      {req.price} USD
                    </Typography>
                  </Stack>
                }
              />
            </ListItemButton>
            <Divider component="li" sx={{ bgcolor: grey[700] }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
