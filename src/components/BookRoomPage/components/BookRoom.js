import { useState, useEffect } from "react";
import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import PhoneNumberField from "./PhoneNumberField";
import NameField from "./NameField";
import SurnameField from "./SurnameField";
import CreateReservationButton from "./CreateReservationButton";
import RoomList from "./roomList";
import useBookRoom from "../hooks/useBookRoom";

const BookRoom = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [clicked, setClicked] = useState(false);
  const { bookRoom, loading, error, response } = useBookRoom();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log(loading, response);
  /*useState  for tracking if all fields are filled correctly*/
  const [disabled, setDisabled] = useState(true);

  /*Update disabled condition when input changes */
  useEffect(() => {
    setDisabled(
      name.length == null ||
        surname.length == null ||
        phone.length !== 9 ||
        !selectedRoom
    );
  }, [name, surname, phone, selectedRoom]);

  /*Make reservation */
  const handleReserve = async () => {
    if (disabled) return;
    try {
      await bookRoom({
        g_name: name,
        surname: surname,
        phone_num: phone,
        room_type: selectedRoom,
      });
      setOpenSnackbar(true);
    } catch (e) {}
  };

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      sx={{
        width: "100%",
        maxWidth: "800px",
        p: 2,
      }}
      spacing={2}
    >
      <Typography fontSize="25px" fontWeight={900}>
        BOOK THE ROOM IN OUR HOTEL
      </Typography>
      <RoomList value={selectedRoom} onChange={setSelectedRoom} />
      <Stack
        direction="column"
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <NameField name={name} setName={setName} />
        <SurnameField surname={surname} setSurname={setSurname} />
        <PhoneNumberField phone={phone} setPhone={setPhone} />
        {error && <Alert severity="error">Error: {error.message}</Alert>}
        <CreateReservationButton
          disabled={disabled}
          setClicked={setClicked}
          clicked={clicked}
          onClick={handleReserve}
        />
      </Stack>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Thank you! Your reservation is created successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default BookRoom;
