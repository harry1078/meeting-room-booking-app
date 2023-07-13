import { configureStore } from "@reduxjs/toolkit";
import { meetingStateReducer } from "../Redux/slice";

const store = configureStore({
  reducer: {
    meetings: meetingStateReducer,
  },
});

export default store;
