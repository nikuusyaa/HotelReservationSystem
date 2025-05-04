import React, { useState } from "react";
import {
  Box,
  List,
  ListItemText,
  Typography,
  CircularProgress,
  Divider,
  ListItemButton,
} from "@mui/material";
import useReservation from "../hooks/useReservation";
import CustomSnackbar from "../../CustomSnackbar";
import { Stack } from "@mui/system";
import { blue, blueGrey, grey } from "@mui/material/colors";

export default function UserReservationsList() {
  const { reservations, loading, error } = useReservation();
  const [openSnackbar, setOpenSnackbar] = useState();

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
        text="Failed to Get Reservations Data"
        severity="error"
      />
    );
  }
  if (!reservations || reservations.length === 0) {
    return (
      <Typography variant="body1" align="center" mt={4}>
        You don't have active reservations.
      </Typography>
    );
  }
  return (
    <Box mx="auto" bgcolor={grey[800]} borderRadius={5} pb={1}>
      <Box
        bgcolor={blue[600]}
        p={1}
        sx={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Typography fontSize={25} fontWeight={900} gutterBottom align="center">
          Your Reservations
        </Typography>
      </Box>
      <List>
        {reservations.map((res) => (
          <React.Fragment key={res.reservation_id}>
            <ListItemButton
              alignItems="center"
              sx={{
                transition: "background-color 0.2s, color 0.2s",
                "&:hover": {
                  backgroundColor: blueGrey[800], // theme.palette.primary.main
                  color: "common.white", // white text
                  "& .MuiListItemIcon-root": {
                    color: "common.white", // also make the icon white
                  },
                },
              }}
            >
              <ListItemText
                primary={
                  <>
                    <Stack direction="row">
                      <Typography
                        pr={1}
                        fontSize={22}
                        fontWeight={900}
                        color={blue[500]}
                      >
                        Reservation Number:
                      </Typography>
                      <Typography fontSize={20} fontWeight={900} color="white">
                        {res.reservation_id}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        pr={1}
                        fontSize={22}
                        fontWeight={900}
                        color={blue[500]}
                      >
                        Room:
                      </Typography>
                      <Typography fontSize={20} fontWeight={900} color="white">
                        {res.room.RoomNum} ({res.room.Type.trim()})
                      </Typography>
                    </Stack>
                  </>
                }
                secondary={
                  <>
                    <Stack direction="row">
                      <Typography
                        pr={1}
                        fontSize={20}
                        fontWeight={700}
                        color={blue[500]}
                      >
                        Stay Period:
                      </Typography>
                      <Typography fontSize={20} fontWeight={900} color="white">
                        {res.check_in_date} — {res.check_out_date}
                      </Typography>
                    </Stack>

                    <Stack direction="row">
                      <Typography
                        pr={1}
                        fontSize={20}
                        fontWeight={700}
                        color={blue[500]}
                      >
                        Price:
                      </Typography>
                      <Typography fontSize={20} fontWeight={700} color="white">
                        {res.total_price} USD
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      <Typography
                        pr={1}
                        fontSize={20}
                        fontWeight={700}
                        color={blue[500]}
                      >
                        Reservation Status:
                      </Typography>
                      <Typography fontSize={20} fontWeight={700} color="white">
                        {res.status}
                      </Typography>
                    </Stack>
                  </>
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
