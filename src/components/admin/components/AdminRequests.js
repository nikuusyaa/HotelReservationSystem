import { AppBar, Toolbar, Typography } from "@mui/material";
import RequestsList from "./RequestsList";
import AdminMenu from "./AdminMenu";

export default function AdminRequests() {
  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={10}
        sx={{
          top: 75,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ pl: 2 }} fontSize={30} fontWeight={900}>
            Hello, You are logged in as Administrator !
          </Typography>
          <AdminMenu />
        </Toolbar>
        <RequestsList />
      </AppBar>
    </>
  );
}
