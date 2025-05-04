import { Box } from "@mui/material";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function SingleDateCalendar({ date, setDate }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        width: 300,
      }}
    >
      <Calendar
        date={date}
        onChange={(selectedDate) => setDate(selectedDate)}
      />
    </Box>
  );
}
