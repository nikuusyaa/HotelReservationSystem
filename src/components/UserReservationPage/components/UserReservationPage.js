import { Stack } from "@mui/system";
import useReservation from "../hooks/useReservation";
import UserReservationsList from "./UserReservationList";

export default function UserReservationPage() {
  const data = useReservation();
  console.log(data.reservations);

  return (
    <Stack>
      <UserReservationsList />
    </Stack>
  );
}
