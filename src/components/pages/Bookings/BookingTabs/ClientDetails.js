import { Textarea } from "@mui/joy";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { meetingStateAction } from "../../../../Redux/slice";
import SelectDropdown from "../../../Custom/SelectDropdown";
import { countries } from "../../../../MockData";
import axios from "../../../../API/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { adminModuleSelector } from "../../../../Redux/selectors";
import { toFormData } from "axios";

export const ClientDetails = () => {
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredContactNumber, setEnteredContactNumber] = useState("");
  const [enteredCompany, setEnteredCompany] = useState("");
  const [enteredNote, setEnteredNote] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredState, setEnteredState] = useState("");
  const [enteredZip, setEnteredZip] = useState("");
  const [enteredCountry, setEnteredCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookingDetails = useSelector(adminModuleSelector.getBookingDetails());
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const contactChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 10);
    setEnteredContactNumber(event.target.value);
  };
  const noteChangeHandler = (event) => {
    setEnteredNote(event.target.value);
  };
  const companyChangeHandler = (event) => {
    setEnteredCompany(event.target.value);
  };
  const stateChangeHandler = (event) => {
    setEnteredState(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };
  const cityChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };
  const zipChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 6);
    setEnteredZip(event.target.value);
  };
  const countryChangeHandler = (value) => {
    setEnteredCountry(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new toFormData();

    const userDetails = {
      id: Math.ceil(Math.random() * 1000),
      name: enteredName,
      email: enteredEmail,
      contactNumber: parseInt(enteredContactNumber),
      company: enteredCompany,
      note: enteredNote,
      address: enteredAddress,
      city: enteredCity,
      state: enteredState,
      zip: parseInt(enteredZip),
      country: enteredCountry,
    };

    dispatch(meetingStateAction.setClientDetails(userDetails));
    const request = { ...bookingDetails, ...userDetails };
    const response = await axios.post("/bookings", request);
    dispatch(
      meetingStateAction.setPostResponseData({
        clientResponseData: response.data,
      })
    );
    Swal.fire({
      title: "Submitted!",
      text: "Your details has been submitted successfully.",
      icon: "success",
      allowOutsideClick: false,
    });
    resetForm();
    navigate("/bookings");
  };

  const resetForm = () => {
    setEnteredName("");
    setEnteredEmail("");
    setEnteredContactNumber("");
    setEnteredNote("");
    setEnteredCompany("");
    setEnteredAddress("");
    setEnteredCity("");
    setEnteredState("");
    setEnteredZip("");
    setEnteredCountry("");
  };
  const goToBookingsPage = () => {
    navigate("/bookings");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "80%" },
              }}
            >
              <Box>
                <TextField
                  label="Name"
                  name="clientName"
                  type="text"
                  size="small"
                  value={enteredName}
                  onChange={nameChangeHandler}
                />
                <TextField
                  label="Email"
                  name="clientEmail"
                  type="email"
                  size="small"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                />
                <TextField
                  type="number"
                  label="Phone"
                  name="clientPhone"
                  size="small"
                  onKeyDown={blockInvalidChar}
                  value={enteredContactNumber}
                  onChange={contactChangeHandler}
                />
                <Textarea
                  placeholder="Add Note..."
                  value={enteredNote}
                  onChange={noteChangeHandler}
                  color="neutral"
                  minRows={5}
                  size="lg"
                  sx={{ m: 1, width: "90%" }}
                />
                <TextField
                  label="Company"
                  name="clientCompany"
                  type="text"
                  size="small"
                  value={enteredCompany}
                  onChange={companyChangeHandler}
                />
                <TextField
                  label="Address"
                  name="clientAddress"
                  type="text"
                  size="small"
                  value={enteredAddress}
                  onChange={addressChangeHandler}
                />
                <TextField
                  label="City"
                  name="clientCity"
                  type="text"
                  size="small"
                  value={enteredCity}
                  onChange={cityChangeHandler}
                />
                <TextField
                  label="State"
                  name="clientState"
                  type="text"
                  size="small"
                  value={enteredState}
                  onChange={stateChangeHandler}
                />
                <TextField
                  label="Zip"
                  name="clientZip"
                  type="number"
                  size="small"
                  value={enteredZip}
                  onKeyDown={blockInvalidChar}
                  onChange={zipChangeHandler}
                />

                <SelectDropdown
                  data={countries}
                  inputLabel={"Select Country"}
                  styles={{ m: 1, width: "80%" }}
                  size={"small"}
                  selectedValue={countryChangeHandler}
                />
              </Box>
              <Stack
                spacing={2}
                direction="row"
                justifyContent={"flex-end"}
                sx={{ mt: 4 }}
              >
                <Button variant="contained" type="submit">
                  Submit
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
