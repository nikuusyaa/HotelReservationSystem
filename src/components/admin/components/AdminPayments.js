import { AppBar, Toolbar, Typography } from "@mui/material";
import AdminMenu from "./AdminMenu";
import PaymentsList from "./PaymentsList";

export default function AdminPayments() {
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
        <PaymentsList />
      </AppBar>
    </>
  );
}
