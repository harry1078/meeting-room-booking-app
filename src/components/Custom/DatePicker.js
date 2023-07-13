import { useState } from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./styles.css";

export const DatesPicker = (props) => {
  const { dateFormat, selectedDate, placeholder, label } = props;
  const [value, setValue] = useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
    const formattedDate = new Date(
      new Date(newValue).setHours(5, 30)
    ).toISOString();

    selectedDate(formattedDate);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const renderTextInput = (params) => {
    return (
      <TextField
        onKeyDown={onKeyDown}
        autoComplete="off"
        label="Booking Date"
        {...params}
        inputProps={{
          ...params.inputProps,
          placeholder: placeholder,
        }}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        format={dateFormat}
        value={value}
        label={label}
        onChange={handleChange}
        disablePast={true}
        InputLabelProps={{
          shrink: true,
        }}
        renderInput={renderTextInput}
      />
    </LocalizationProvider>
  );
};
