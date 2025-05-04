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
import BookServiceButton from "./BookServiceButton";

export default function ServicesList({ onSuccess }) {
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
      <Box sx={{ m: 1, pr: 2, pl: 2, maxHeight: 300, overflowY: "auto" }}>
        <Typography
          fontSize={20}
          fontWeight={900}
          color="primary"
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 10,
          }}
        >
          In-Hotel Services
        </Typography>
        <List disablePadding>
          {ihServices.map((svc) => (
            <ListItem sx={{ p: 0 }} key={svc.id}>
              <ListItemText
                primary={
                  <Typography
                    color={blueGrey[800]}
                    fontSize={18}
                    fontWeight={900}
                  >
                    {svc.s_name}
                    <BookServiceButton
                      requestId={svc.service_id}
                      onSuccess={onSuccess}
                    />
                  </Typography>
                }
                secondary={`Price: ${svc.price} USD`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 0.2 }} />

        <Typography
          fontSize={20}
          fontWeight={900}
          color="primary"
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 10,
          }}
        >
          Tour Services
        </Typography>
        <List disablePadding>
          {tServices.map((svc) => (
            <ListItem key={svc.id} sx={{ p: 0 }}>
              <ListItemText
                primary={
                  <Typography
                    color={blueGrey[800]}
                    fontSize={18}
                    fontWeight={900}
                    m={0}
                  >
                    {svc.s_name}
                    <BookServiceButton
                      requestId={svc.service_id}
                      onSuccess={onSuccess}
                    />
                  </Typography>
                }
                secondary={
                  <>
                    <Typography fontSize={14}>
                      Price: {svc.price} USD
                    </Typography>
                    <Typography fontSize={14}>
                      Location: {svc.location}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
