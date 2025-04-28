import React from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";

const NameField = ({ name, setName }) => {
  // track whether we've “touched” it, so we don't show an error on first render
  const [touched, setTouched] = useState(false);

  // helper to decide if there's an error
  const nameError = touched && name.trim() === "";

  return (
    <>
      <Typography color="primary" fontSize="20px" fontWeight={600}>
        Please fill in your Name
      </Typography>
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: nameError ? "red" : "white", // Цвет рамки в зависимости от ошибки
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
        label="Your Name"
        value={name}
        error={nameError}
        helperText={nameError ? "Name is required" : ""}
        onChange={(e) => {
          setName(e.target.value);
          if (!touched) setTouched(true);
        }}
        onBlur={() => setTouched(true)}
      />
    </>
  );
};

export default NameField;
