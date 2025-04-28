import React from "react";
import { Typography, TextField } from "@mui/material";
import { useState } from "react";

const PhoneNumberField = ({phone, setPhone}) => {

  const [touched, setTouched] = useState(false);

  // Error checking
  const isDigitsOnly = /^\d*$/.test(phone); // only numbers
  const isLengthValid = phone.length === 9; // 9 digits

  const showError = touched && (!isDigitsOnly || !isLengthValid);

  // Type of error message
  const getErrorText = () => {
    if (!isDigitsOnly) return "Only digits are allowed";
    if (!isLengthValid) return "Phone number must be 9 digits";
    return "";
  };

  return (
    <>
      <Typography color="primary" fontSize="20px" fontWeight={600}>
        Please fill in your Phone Number
      </Typography>
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: showError ? "red" : "white", // Цвет рамки в зависимости от ошибки
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
        label="Your Phone Number"
        value={phone}
        error={showError}
        helperText={showError ? getErrorText() : ""}
        onChange={(e) => {
          const value = e.target.value;

          if (/^\d*$/.test(value)) {
            setPhone(value);
          }
          if (!touched) setTouched(true);
        }}
        onBlur={() => setTouched(true)}
      />
    </>
  );
};

export default PhoneNumberField;
