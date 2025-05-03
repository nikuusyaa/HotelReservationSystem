import { Box, Stack } from "@mui/system";
import PhoneNumberField from "../../BookRoom/components/BookRoomPhoneField";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import CustomButton from "../../CustomButton";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState("");

  return (
    <Box
      bgcolor={grey[800]}
      borderRadius={5}
      sx={{ boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.5)" }}
    >
      <Typography fontSize={25} fontWeight={900} pt={2}>
        Log in to User Section
      </Typography>
      <Stack p={10} pt={3}>
        <PhoneNumberField phone={phone} setPhone={setPhone} />
        <CustomButton
          component={Link}
          to="/user-reservation"
          onClick={() => console.log("hello")}
          disabled={phone.length !== 9}
        />
      </Stack>
    </Box>
  );
}
