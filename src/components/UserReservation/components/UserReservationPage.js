import { Stack } from "@mui/system";
import UserReservationsList from "./UserReservationList";
import UserRequestsList from "./UserRequestsList";
import { useAuth } from "../../../Contexts/AuthContext";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function UserReservationPage() {
  const data = useAuth().response;
  
  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={5}
        sx={{
          top: 75,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar variant="dense">
          <Typography fontSize={30} fontWeight={900}>
            Hello, {data.g_name} {data.surname} !
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack direction="row" gap={5}>
        <UserReservationsList />
        <UserRequestsList />
      </Stack>
    </>
  );
}
