import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideNavOpen: true,
  bookingList: [],
  roomList: [],
  clientDetails: {
    name: "",
    email: "",
    contactNumber: 0,
    company: "",
    note: "",
    address: "",
    city: "",
    state: "",
    zip: 0,
    country: "",
  },
  bookingDetails: {
    date: "",
    layout: "",
    count: 0,
    duration: "",
    room: "",
    status: "",
    total: 0,
  },
  postResponseData: {
    clientResponseData: {},
    roomsResponseData: {},
  },
};

const meetingSlice = createSlice({
  name: "meetings",
  initialState: initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.isSideNavOpen = action.payload;
    },
    setBookingDetails: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        bookingDetails: {
          ...prevState.bookingDetails,
          ...payload,
        },
      };
    },
    setClientDetails: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        clientDetails: {
          ...prevState.clientDetails,
          ...payload,
        },
      };
    },
    setBookingList: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        bookingList: payload,
      };
    },
    setRoomList: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        roomList: payload,
      };
    },

    setPostResponseData: (prevState, action) => {
      const { payload } = action;
      return {
        ...prevState,
        postResponseData: { ...prevState.postResponseData, ...payload },
      };
    },
  },
});

export const meetingStateAction = meetingSlice.actions;

export const meetingStateReducer = meetingSlice.reducer;
