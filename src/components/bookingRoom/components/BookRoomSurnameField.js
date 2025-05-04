import React from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function BookRoomSurnameField({ surname, setSurname }) {
  const [touchedSurname, setTouchedSurname] = useState(false);
  const surnameError = touchedSurname && surname.trim() === "";

  return (
    <>
      <Typography color="primary" fontSize="20px" fontWeight={600}>
        Please fill in your Surname
      </Typography>
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: surnameError ? "red" : "white", // Цвет рамки в зависимости от ошибки
            },
            "& input": {
              color: "white", // Цвет текста
            },
          },
          "& .MuiInputLabel-root": {
            color: "white", // Цвет метки
            "&.Mui-focused": {
              color: "white", // Цвет метки, когда поле в фокусе
            },
          },
          "& .MuiInputLabel-shrink": {
            color: "white", // Цвет метки, когда она сжата (вверху)
          },
        }}
        fullWidth
        label="Your Surname"
        value={surname}
        error={surnameError}
        helperText={surnameError ? "Surname is required" : ""}
        onChange={(e) => {
          setSurname(e.target.value);
          if (!touchedSurname) setTouchedSurname(true);
        }}
        onBlur={() => setTouchedSurname(true)}
      />
    </>
  );
}
