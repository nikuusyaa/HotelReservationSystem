import { IconButton, Popover, Tooltip } from "@mui/material";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import SingleDateCalendar from "./SingleDateCalendar";
import { formatDateTime } from "./bookingRoom/utils/formatDateTime";
import { Stack } from "@mui/system";
import { useUpdateReservationDates } from "./hooks/useUpdateReservationDate";

//icons
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CheckIcon from "@mui/icons-material/Check";

export default function ReservationDates({
  firstDate,
  checkInOrCheckOut,
  reservationID,
  refetch,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const processedDate = formatDateTime(date);
  const { updateDates } = useUpdateReservationDates();
  const onSave = async () => {
    const checkIn =
      checkInOrCheckOut === "check-in" ? processedDate : firstDate;
    const checkOut =
      checkInOrCheckOut === "check-out" ? processedDate : firstDate;
    try {
      await updateDates(
        reservationID, // reservationId
        checkIn,
        checkOut
      );
      refetch();
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Tooltip
        title={`Change ${checkInOrCheckOut} date`}
        placement="right"
        arrow
      >
        <IconButton
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <ChangeCircleIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack direction="row">
          <SingleDateCalendar date={date} setDate={setDate} />
          <IconButton onClick={onSave} color="success">
            <CheckIcon />
          </IconButton>
        </Stack>
      </Popover>
    </>
  );
}
