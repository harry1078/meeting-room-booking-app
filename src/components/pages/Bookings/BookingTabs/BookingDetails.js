import { Textarea } from "@mui/joy";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { meetingStateAction } from "../../../../Redux/slice";
import SelectDropdown from "../../../Custom/SelectDropdown";
import {
  bookingStatus,
  duration,
  roomLayout,
  roomType,
} from "../../../../MockData";
import { DatesPicker } from "../../../Custom/DatePicker";
import { useNavigate } from "react-router-dom";

export const BookingDetails = () => {
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  const [enteredBookingDate, setEnteredBookingDate] = useState("");
  const [enteredAttendeesCount, setEnteredAttendeesCount] = useState("");
  const [selectedRoomLayout, setSelectedRoomLayout] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let getNewDate;
  let selectedStartDate;
  let selectedMonth;
  let selectedYear;
  let convertedDate;

  const bookingDate = (value) => {
    const formattedDate = isDate(value);
    setEnteredBookingDate(formattedDate);
  };

  const isDate = (selectedDate) => {
    getNewDate = new Date(selectedDate);
    selectedStartDate = getNewDate.getDate();
    selectedMonth = getNewDate.getMonth() + 1;
    selectedYear = getNewDate.getFullYear();
    convertedDate = `${selectedStartDate}-${selectedMonth}-${selectedYear}`;
    return convertedDate;
  };

  const attendeesCountChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 4);
    setEnteredAttendeesCount(event.target.value);
  };

  const roomLayoutChangeHandler = (value) => {
    setSelectedRoomLayout(value);
  };
  const roomTypeChangeHandler = (value) => {
    setSelectedRoomType(value);
  };
  const durationChangeHandler = (value) => {
    setSelectedDuration(value);
  };
  const statusChangeHandler = (value) => {
    setStatus(value);
  };
  const priceChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 7);
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      meetingStateAction.setBookingDetails({
        date: enteredBookingDate,
        layout: selectedRoomLayout,
        count: parseInt(enteredAttendeesCount),
        duration: selectedDuration,
        room: selectedRoomType,
        status: status,
        total: parseInt(price),
      })
    );

    // resetForm();
  };

  const resetForm = () => {
    setEnteredBookingDate("");
    setSelectedRoomLayout("");
    setSelectedRoomType("");
    setEnteredAttendeesCount("");
    setSelectedDuration("");
    setStatus("");
    setPrice("");
  };

  const goToBookingsPage = () => {
    navigate("/bookings");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={6}>
        <Card>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
              }}
            >
              <Box>
                <DatesPicker
                  dateFormat="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  label="Booking Date"
                  selectedDate={bookingDate}
                />

                <TextField
                  type="number"
                  label="Attendees"
                  name="attendees"
                  size="small"
                  onKeyDown={blockInvalidChar}
                  value={enteredAttendeesCount}
                  onChange={attendeesCountChangeHandler}
                />

                <SelectDropdown
                  data={roomLayout}
                  inputLabel={"Select Room Layout"}
                  styles={{ m: 1, width: "100%" }}
                  size={"small"}
                  selectedValue={roomLayoutChangeHandler}
                />
                <SelectDropdown
                  data={roomType}
                  inputLabel={"Select Room Type"}
                  styles={{ m: 1, width: "100%" }}
                  size={"small"}
                  selectedValue={roomTypeChangeHandler}
                />
                <SelectDropdown
                  data={duration}
                  inputLabel={"Select Duration"}
                  styles={{ m: 1, width: "100%" }}
                  size={"small"}
                  selectedValue={durationChangeHandler}
                />

                <SelectDropdown
                  data={bookingStatus}
                  inputLabel={"Select Status"}
                  styles={{ m: 1, width: "100%" }}
                  size={"small"}
                  selectedValue={statusChangeHandler}
                />

                <FormControl fullWidth sx={{ m: 1 }} size="small">
                  <InputLabel htmlFor="outlined-adornment-price">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-price"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Price"
                    type="number"
                    onKeyDown={blockInvalidChar}
                    value={price}
                    onChange={priceChangeHandler}
                  />
                </FormControl>
              </Box>
              <Stack
                spacing={2}
                direction="row"
                justifyContent={"flex-end"}
                sx={{ mt: 2 }}
              >
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Button variant="text" onClick={goToBookingsPage}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
