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
import { Stack } from "@mui/system";
import { blueGrey, grey } from "@mui/material/colors";
import HotelIcon from "@mui/icons-material/Hotel";
import CustomSnackbar from "../../CustomSnackbar";
import useReservations from "../hooks/useReservations";
import ReservationDates from "../../ReservationDates";

export default function ReservationsList() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { reservations, loading, error, refetch } = useReservations();

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
        text="Failed to load reservations"
        severity="error"
      />
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <Typography fontSize={25} fontWeight={900} color="white">
        No reservations to display
      </Typography>
    );
  }

  // Group by guest
  const groups = reservations.reduce((acc, res) => {
    const guest = `Guest ${res.guest_id}`;
    if (!acc[guest]) acc[guest] = [];
    acc[guest].push(res);
    return acc;
  }, {});

  return (
    <>
      <Stack bgcolor="#282C34">
        <Typography fontSize={30} fontWeight={900} color="white" p={0} m={0}>
          <HotelIcon sx={{ pr: 2 }} />
          RESERVATIONS
        </Typography>
      </Stack>

      <Box bgcolor="#282C34" sx={{ maxHeight: "78vh", overflow: "auto" }}>
        <Box m={2} mr={7} ml={7}>
          <Stack container spacing={2}>
            {Object.entries(groups).map(([guest, items]) => (
              <Box key={guest} bgcolor={grey[600]}>
                <Paper elevation={3} sx={{ maxHeight: 200, overflow: "auto" }}>
                  <ListSubheader disableGutters>
                    <Typography
                      fontSize={20}
                      fontWeight={900}
                      color={blueGrey[800]}
                      bgcolor={grey[400]}
                      p={1}
                    >
                      {guest}
                    </Typography>
                  </ListSubheader>
                  <List sx={{ justifyContent: "space-between" }}>
                    {items.map((res, index) => (
                      <ListItem
                        key={res.reservation_id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Stack>
                          <Stack direction="row">
                            <Typography
                              pr={1}
                              fontSize={20}
                              fontWeight={700}
                              color="primary"
                            >
                              Reservation №{index + 1}
                            </Typography>
                            <Typography
                              fontSize={20}
                              fontWeight={700}
                              color="primary"
                            >
                              Room: {res.room_num}
                            </Typography>
                          </Stack>
                          <Stack direction="row">
                            <Typography
                              fontSize={20}
                              fontWeight={700}
                              color={blueGrey[800]}
                            >
                              Check-in date: {res.check_in_date}
                            </Typography>
                            <ReservationDates
                              refetch={refetch}
                              reservationID={res.reservation_id}
                              firstDate={res.check_out_date}
                              checkInOrCheckOut="check-in"
                            />
                          </Stack>
                          <Stack direction="row">
                            <Typography
                              fontSize={20}
                              fontWeight={700}
                              color={blueGrey[800]}
                            >
                              Check-out date: {res.check_out_date}
                            </Typography>
                            <ReservationDates
                              refetch={refetch}
                              reservationID={res.reservation_id}
                              firstDate={res.check_in_date}
                              checkInOrCheckOut="check-out"
                            />
                          </Stack>
                          <Typography
                            fontSize={20}
                            fontWeight={700}
                            color={blueGrey[800]}
                          >
                            Total Price: {res.total_price} $
                          </Typography>
                          <Typography
                            fontSize={20}
                            fontWeight={700}
                            color={blueGrey[800]}
                          >
                            Status: {res.status}
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
