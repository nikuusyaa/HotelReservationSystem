import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

export default function UserReservationPage() {
  return (
    <Box
      bgcolor={grey[800]}
      borderRadius={5}
      sx={{ boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.5)" }}
    >
      <Typography fontSize={25} fontWeight={900} pt={2}>
        Balerina Capucina
      </Typography>
    </Box>
  );
}
