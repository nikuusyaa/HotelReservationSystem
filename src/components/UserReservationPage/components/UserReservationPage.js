import { Stack } from "@mui/system";
import UserReservationsList from "./UserReservationList";
import UserRequestsList from "./UserRequestsList";

export default function UserReservationPage() {
  return (
    <Stack direction="row" gap={5}>
      <UserReservationsList />
      <UserRequestsList />
    </Stack>
  );
}
