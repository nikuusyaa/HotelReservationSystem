import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import useRoomTypes from "../hooks/useRoomTypes";
import { Skeleton } from "@mui/material";

export default function RoomList({ value, onChange }) {
  const { roomTypes, loading, error } = useRoomTypes();

  if (loading) {
    return (
      <>
        <Stack direction="column">
          <Stack direction="row">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton
              width="200px"
              variant="text"
              sx={{ fontSize: "2rem", pl: 4 }}
            />
          </Stack>
          <Stack direction="row">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton
              width="200px"
              variant="text"
              sx={{ fontSize: "2rem", pl: 4 }}
            />
          </Stack>
          <Stack direction="row">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton
              width="200px"
              variant="text"
              sx={{ fontSize: "2rem", pl: 4 }}
            />
          </Stack>
        </Stack>
      </>
    );
  }
  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: "25px", fontWeight: 600, color: "white" }}>
        Choose room type
      </FormLabel>
      <RadioGroup
        name="room-type"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {roomTypes.map(({ type, maxCapacity, price }) => (
          <FormControlLabel
            key={type}
            value={type}
            control={<Radio />}
            label={
              <Stack direction="row" spacing={1}>
                <Typography fontSize="15px" fontWeight={600}>
                  {type}
                </Typography>
                <Typography
                  fontSize="15px"
                  fontWeight={600}
                  variant="body2"
                  color="white"
                >
                  (Capacity: {maxCapacity}, Price: ${price})
                </Typography>
              </Stack>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
