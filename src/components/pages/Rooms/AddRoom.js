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
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { activityStatus, layouts } from "../../../MockData";
import axios from "../../../API/axios";
import { meetingStateAction } from "../../../Redux/slice";
import SelectDropdown from "../../Custom/SelectDropdown";
import { ContentWrapper } from "../ContentWrapper";

export const AddRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredCapacity, setEnteredCapacity] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPricePerDay, setEnteredPricePerDay] = useState("");
  const [enteredPricePerHour, setEnteredPricePerHour] = useState("");
  const [activity, setActivity] = useState("");
  const [roomLayout, setRoomLayout] = useState("");
  const [image, setImage] = useState();

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const capacityChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 10);
    setEnteredCapacity(Number(event.target.value));
  };

  const descChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const pricePerDayChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 7);
    setEnteredPricePerDay(Number(event.target.value));
  };

  const pricePerHourChangeHandler = (event) => {
    event.target.value = Math.max(0, parseInt(event.target.value))
      .toString()
      .slice(0, 7);
    setEnteredPricePerHour(Number(event.target.value));
  };

  const activityChangeHandler = (value) => {
    setActivity(value);
  };
  const layoutChangeHandler = (value) => {
    setRoomLayout(value);
  };

  const handleFileEvent = (event) => {
    const chosenFile = event.target.files[0];
    chosenFile.url = URL.createObjectURL(chosenFile);
    console.log(chosenFile);
    setImage(chosenFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("id", Math.ceil(Math.random() * 1000));
    data.append("title", enteredTitle);
    data.append("image", image);
    data.append("capacity", enteredCapacity);
    data.append("description", enteredDescription);
    data.append("pricePerDay", enteredPricePerDay);
    data.append("pricePerHour", enteredPricePerHour);
    data.append("layout", roomLayout);
    data.append("activity", activity);
    console.log(data, "form");
    try {
      const response = await axios.post("/rooms", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response, "response");
    } catch (error) {}
  };

  const resetForm = () => {
    setEnteredTitle("");
    setEnteredCapacity("");
    setEnteredDescription("");
    setEnteredPricePerDay("");
    setEnteredPricePerHour("");
    setActivity("");
  };
  const goToRoomsPage = () => {
    navigate("/rooms");
  };

  const onInputClick = (event) => {
    event.target.value = "";
  };

  console.log(enteredCapacity, typeof enteredCapacity);

  return (
    <ContentWrapper>
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
                    label="Title"
                    name="roomName"
                    type="text"
                    size="small"
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                  />

                  <TextField
                    label="Image"
                    name="Image"
                    type="file"
                    size="small"
                    onChange={handleFileEvent}
                    onClick={onInputClick}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    type="number"
                    label="Capacity"
                    name="capacity"
                    size="small"
                    onKeyDown={blockInvalidChar}
                    value={enteredCapacity}
                    onChange={capacityChangeHandler}
                  />
                  <Textarea
                    placeholder="Add Description..."
                    value={enteredDescription}
                    onChange={descChangeHandler}
                    color="neutral"
                    minRows={5}
                    size="lg"
                    sx={{ m: 1, width: "90%" }}
                  />

                  <FormControl sx={{ m: 1, width: "40%" }} size="small">
                    <InputLabel htmlFor="outlined-adornment-price">
                      Price per day
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-price"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Price per day"
                      type="number"
                      onKeyDown={blockInvalidChar}
                      value={enteredPricePerDay}
                      onChange={pricePerDayChangeHandler}
                    />
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "40%" }} size="small">
                    <InputLabel htmlFor="outlined-adornment-price">
                      Price per hour
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-price"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Price per hour"
                      type="number"
                      onKeyDown={blockInvalidChar}
                      value={enteredPricePerHour}
                      onChange={pricePerHourChangeHandler}
                    />
                  </FormControl>

                  <SelectDropdown
                    data={layouts}
                    inputLabel={"Layout"}
                    styles={{ m: 1, width: "40%" }}
                    size={"small"}
                    selectedValue={layoutChangeHandler}
                  />
                  <SelectDropdown
                    data={activityStatus}
                    inputLabel={"Status"}
                    styles={{ m: 1, width: "60%" }}
                    size={"small"}
                    selectedValue={activityChangeHandler}
                  />
                </Box>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent={"flex-end"}
                  sx={{ mt: 4 }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button variant="text" onClick={goToRoomsPage}>
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
