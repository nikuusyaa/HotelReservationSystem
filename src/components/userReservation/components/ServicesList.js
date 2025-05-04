import React from "react";
import {
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { useInHotelServices } from "../hooks/useInHotelServices";
import { useTourServices } from "../hooks/useTourServices";
import { blueGrey } from "@mui/material/colors";

export default function ServicesList() {
  // Fetch In-Hotel services
  const {
    services: ihServices,
    loading: ihLoading,
    error: ihError,
    refetch: refetchIh,
  } = useInHotelServices();

  // Fetch Transfer services
  const {
    services: tServices,
    loading: tLoading,
    error: tError,
    refetch: refetchT,
  } = useTourServices();

  if (ihLoading || tLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (ihError || tError) {
    return (
      <Box p={2} textAlign="center">
        <Typography color="error" gutterBottom>
          Error loading services: {ihError?.message || tError?.message}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            refetchIh();
            refetchT();
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ p: 2, maxHeight: 400, overflowY: "auto" }}>
        <Typography fontSize={20} fontWeight={900} color="primary">
          In-Hotel Services
        </Typography>
        <List dense disablePadding>
          {ihServices.map((svc) => (
            <ListItem key={svc.id}>
              <ListItemText
                primary={
                  <Typography
                    color={blueGrey[800]}
                    fontSize={18}
                    fontWeight={900}
                  >
                    {svc.s_name}
                  </Typography>
                }
                secondary={`Price: ${svc.price} USD`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Typography fontSize={20} fontWeight={900} color="primary">
          Transfer Services
        </Typography>
        <List dense disablePadding>
          {tServices.map((svc) => (
            <ListItem key={svc.id}>
              <ListItemText
                primary={
                  <Typography
                    color={blueGrey[800]}
                    fontSize={18}
                    fontWeight={900}
                  >
                    {svc.s_name}
                  </Typography>
                }
                secondary={`Price: ${svc.price} USD`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
