import { Box } from "@mui/material";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BookRoomCalendar({ date, setDate }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <DateRange ranges={date} onChange={(item) => setDate([item.selection])} />
    </Box>
  );
}
