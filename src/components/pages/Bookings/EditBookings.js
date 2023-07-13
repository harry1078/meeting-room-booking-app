import React, { useState } from "react";
import { Textarea } from "@mui/joy";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import SelectDropdown from "../../Custom/SelectDropdown";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminModuleSelector } from "../../../Redux/selectors";
import {
  bookingStatus,
  duration as roomDuration,
  roomType,
} from "../../../MockData";
import { DatesPicker } from "../../Custom/DatePicker";
import { ContentWrapper } from "../ContentWrapper";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "../../../API/axios";
import { meetingStateAction } from "../../../Redux/slice";
import Swal from "sweetalert2";

export const EditBookings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const bookingList = useSelector(adminModuleSelector.getBookingList());

  const fetchBookingDetailsById = bookingList.filter((booking) => {
    return booking.id == id;
  });

  const { name, count, room, duration, status, total, ...rest } =
    fetchBookingDetailsById[0];

  const [editBooking, setEditBooking] = useState({
    id: id,
    name,
    count,
    room,
    duration,
    status,
    total,
    ...rest,
  });

  const bookingNameChangeHandler = (event) => {
    setEditBooking({ ...editBooking, name: event.target.value });
  };

  const attendeesCountChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 4);
    setEditBooking({ ...editBooking, count: parseInt(event.target.value) });
  };

  const roomLayoutChangeHandler = (event) => {
    setEditBooking({ ...editBooking, room: event.target.value });
  };

  const statusChangeHandler = (event) => {
    setEditBooking({ ...editBooking, status: event.target.value });
  };

  const durationChangeHandler = (event) => {
    setEditBooking({ ...editBooking, duration: event.target.value });
  };
  const priceChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 7);
    setEditBooking({ ...editBooking, total: parseInt(event.target.value) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.put(
      `/bookings/${editBooking.id}`,
      editBooking
    );
    const { id } = response.data;
    const updatedBookingDetails = bookingList.map((booking) => {
      return booking.id === id ? { ...response.data } : booking;
    });

    dispatch(meetingStateAction.setBookingList(updatedBookingDetails));
    Swal.fire({
      title: "Updated!",
      text: "Your data has been updated successfully.",
      icon: "success",
      allowOutsideClick: false,
    });
    navigate("/bookings");
  };

  const goToBookingsPage = () => {
    navigate("/bookings");
  };

  return (
    <ContentWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ m: 1, mb: 2 }}>
                Edit Booking
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
              >
                <Box>
                  <TextField
                    type="text"
                    label="Name"
                    name="bookingName"
                    size="small"
                    value={editBooking.name}
                    onChange={bookingNameChangeHandler}
                  />
                  <TextField
                    type="number"
                    label="Attendees"
                    name="attendees"
                    size="small"
                    onKeyDown={blockInvalidChar}
                    value={parseInt(editBooking.count)}
                    onChange={attendeesCountChangeHandler}
                  />

                  <TextField
                    id="outlined"
                    select
                    label="Select Room Layout"
                    value={editBooking?.room}
                    onChange={roomLayoutChangeHandler}
                  >
                    {roomType?.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined"
                    select
                    label="Select Status"
                    value={editBooking?.status}
                    onChange={statusChangeHandler}
                  >
                    {bookingStatus.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="outlined"
                    select
                    label="Duration"
                    value={editBooking?.duration}
                    onChange={durationChangeHandler}
                  >
                    {roomDuration.map((option) => (
                      <MenuItem key={option.id} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

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
                      value={parseInt(editBooking.total)}
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
                    Update
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
    </ContentWrapper>
  );
};
