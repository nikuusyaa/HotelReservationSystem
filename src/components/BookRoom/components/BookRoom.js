import { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import BookRoomPhoneField from "./BookRoomPhoneField";
import BookRoomNameField from "./BookRoomNameField";
import BookRoomSurnameField from "./BookRoomSurnameField";
import BookRoomButton from "./BookRoomButton";
import BookRoomTypesList from "./BookRoomTypesList";
import useBookRoom from "../hooks/useBookRoom";
import BookRoomCalendar from "./BookRoomCalendar";
import { addDays } from "date-fns";
import { formatDateTime } from "../utils/formatDateTime";
import CustomSnackbar from "../../CustomSnackbar";
import { useNavigate } from "react-router-dom";

export default function BookRoom() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [clicked, setClicked] = useState(false);
  const { bookRoom, error } = useBookRoom();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

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
      navigate("/user-reservation");
    } catch (e) {
      setSnackbarOpen(true);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      <Typography color="primary" fontSize={25} fontWeight={900}>
        BOOK THE ROOM IN OUR HOTEL
      </Typography>
      <BookRoomTypesList value={selectedRoom} onChange={setSelectedRoom} />
      <Stack
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <Typography pb={2} fontSize={24} fontWeight={900}>
          Reservation Details
        </Typography>
        <Stack direction="row">
          <Stack sx={{ p: 1 }}>
            <BookRoomNameField name={name} setName={setName} />
            <BookRoomSurnameField surname={surname} setSurname={setSurname} />
            <BookRoomPhoneField phone={phone} setPhone={setPhone} />
            {error && (
              <CustomSnackbar
                openSnackbar={snackbarOpen}
                setOpenSnackbar={setSnackbarOpen}
                text="Failed to Create Reservation"
                severity="error"
              />
            )}
          </Stack>
          <BookRoomCalendar date={date} setDate={setDate} />
        </Stack>

        <BookRoomButton
          disabled={disabled}
          setClicked={setClicked}
          clicked={clicked}
          onClick={handleReserve}
        />
      </Stack>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        text="Thank you! Your reservation is created successfully!"
        severity="success"
      />
    </Stack>
  );
}
