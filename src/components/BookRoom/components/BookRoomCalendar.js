import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BookRoomCalendar({ date, setDate }) {
  return (
    <DateRange ranges={date} onChange={(item) => setDate([item.selection])} />
  );
}
