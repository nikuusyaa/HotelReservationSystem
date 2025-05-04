import { AppBar, Toolbar, Typography } from "@mui/material";
import RequestsList from "./RequestsList";

export default function AdminPage() {
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
            Hello, You are logged in as Administrator !
          </Typography>
        </Toolbar>
        <RequestsList />
      </AppBar>
    </>
  );
}
