import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListSubheader,
} from "@mui/material";
import CustomSnackbar from "../../CustomSnackbar";
import { Stack } from "@mui/system";
import { blue, blueGrey, grey } from "@mui/material/colors";
import useServiceRequests from "../../serviceManagement/hooks/useServiceRequests";

//icons
import RoomServiceIcon from "@mui/icons-material/RoomService";

export default function RequestsList() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { requests, loading, error } = useServiceRequests();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        text=" Failed to load Requests"
        severity="error"
      />
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <Typography fontSize={25} fontWeight={900} color="white">
        No requests to proceed
      </Typography>
    );
  }

  const groups = requests.reduce((acc, req) => {
    const guest = `${req.GuestName.trim()} ${req.GuestSurname.trim()}`;
    if (!acc[guest]) acc[guest] = [];
    acc[guest].push(req);
    return acc;
  }, {});

  return (
    <>
      <Stack bgcolor={grey[800]}>
        <Typography fontSize={30} fontWeight={900} color="white" p={0} m={0}>
          <RoomServiceIcon sx={{ pr: 2 }} />
          SERVICE REQUESTS
        </Typography>
      </Stack>
      <Box bgcolor={grey[800]} sx={{ maxHeight: 700, overflow: "auto" }}>
        <Box m={5}>
          <Stack container spacing={2}>
            {Object.entries(groups).map(([guest, items]) => (
              <Box bgcolor={grey[600]}>
                <Paper elevation={3} sx={{ maxHeight: 150, overflow: "auto" }}>
                  <ListSubheader disableGutters>
                    <Typography
                      fontSize={20}
                      fontWeight={900}
                      color={blueGrey[800]}
                      bgcolor={grey[400]}
                    >
                      {guest}
                    </Typography>
                  </ListSubheader>
                  <List
                    sx={{
                      justifyContent: "space-between",
                    }}
                  >
                    {items.map((req, index) => (
                      <ListItem
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Stack direction="row">
                          <Typography
                            pr={1}
                            fontSize={20}
                            fontWeight={700}
                            color={blue[500]}
                          >
                            Request №{index + 1}
                          </Typography>
                          <Typography
                            fontSize={20}
                            fontWeight={700}
                            color={blueGrey[800]}
                          >
                            {req.ServiceName.trim()}
                          </Typography>
                        </Stack>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
