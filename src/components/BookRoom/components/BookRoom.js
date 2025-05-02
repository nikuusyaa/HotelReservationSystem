import { useState, useEffect } from "react";
import { Alert, Stack, Typography } from "@mui/material";
import PhoneNumberField from "./BookRoomPhoneField";
import NameField from "./BookRoomNameField";
import SurnameField from "./BookRoomSurnameField";
import CreateReservationButton from "./BookRoomButton";
import RoomList from "./BookRoomTypesList";
import useBookRoom from "../hooks/useBookRoom";
import BookRoomCalendar from "./BookRoomCalendar";
import BookRoomSnackbar from "./BookRoomSnackbar";
import { addDays } from "date-fns";
import { formatDateTime } from "../utils/formatDateTime";

export default function BookRoom() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [clicked, setClicked] = useState(false);
  const { bookRoom, loading, error, response } = useBookRoom();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

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
        check_in_date: formatDateTime(date[0].startDate),
        check_out_date: formatDateTime(date[0].endDate),
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
      }}
      spacing={2}
    >
      <Typography fontSize="25px" fontWeight={900}>
        BOOK THE ROOM IN OUR HOTEL
      </Typography>
      <RoomList value={selectedRoom} onChange={setSelectedRoom} />
      <Stack
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="row">
          <Stack sx={{ p: 1 }}>
            <NameField name={name} setName={setName} />
            <SurnameField surname={surname} setSurname={setSurname} />
            <PhoneNumberField phone={phone} setPhone={setPhone} />
            {error && <Alert severity="error">Error: {error.message}</Alert>}
          </Stack>
          <BookRoomCalendar date={date} setDate={setDate} />
        </Stack>

        <CreateReservationButton
          disabled={disabled}
          setClicked={setClicked}
          clicked={clicked}
          onClick={handleReserve}
        />
      </Stack>
      <BookRoomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </Stack>
  );
}
