import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListSubheader,
  Stack,
} from "@mui/material";
import { blue, blueGrey, grey } from "@mui/material/colors";
import PaymentIcon from "@mui/icons-material/Payment";
import CustomSnackbar from "../../CustomSnackbar";
import usePayments from "../hooks/usePayments";
import PaymentManagementSubmission from "./PaymentManagementSubmission";

export default function PaymentsList() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { payments, loading, error, refetch } = usePayments();

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
        text="Failed to load payments"
        severity="error"
      />
    );
  }

  if (!payments) {
    return (
      <Typography fontSize={25} fontWeight={900} color="white" align="center">
        No unconfirmed payments
      </Typography>
    );
  }

  const groups = payments.reduce((acc, p) => {
    const guestName = `${p.guest.g_name.trim()} ${p.guest.surname.trim()}`;
    if (!acc[guestName]) acc[guestName] = [];
    acc[guestName].push(p);
    return acc;
  }, {});

  return (
    <>
      <Stack p={1}>
        <Typography fontSize={30} fontWeight={900} color="white">
          <PaymentIcon sx={{ pr: 1 }} />
          UNCONFIRMED PAYMENTS
        </Typography>
      </Stack>

      <Box
        bgcolor={grey[700]}
        borderRadius={5}
        sx={{ maxHeight: 600, overflow: "auto" }}
      >
        <Box m={5}>
          <Stack spacing={2}>
            {Object.entries(groups).map(([guest, items]) => (
              <Box key={guest} bgcolor={grey[600]} borderRadius={2}>
                <Paper elevation={3} sx={{ maxHeight: 150, overflow: "auto" }}>
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

                  <List>
                    {items.map((pmt, idx) => (
                      <ListItem
                        key={pmt.payment_id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Stack direction="column" spacing={2} alignItems="left">
                          <Stack direction="row">
                            <Typography
                              fontSize={20}
                              fontWeight={700}
                              color={blue[500]}
                            >
                              Payment №{idx + 1}
                            </Typography>

                            <PaymentManagementSubmission
                              refetch={refetch}
                              paymentID={pmt.payment_id}
                            />
                          </Stack>
                          <Typography fontSize={18} color={blueGrey[800]}>
                            Time: {new Date(pmt.time).toLocaleString()}
                          </Typography>
                          <Typography fontSize={18} color={blueGrey[800]}>
                            Amount: {pmt.amount_paid} USD
                          </Typography>
                          <Typography fontSize={18} color={blueGrey[800]}>
                            Type: {pmt.type.trim()}
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
