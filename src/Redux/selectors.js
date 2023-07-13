import { createSelector } from "@reduxjs/toolkit";

export const adminModuleSelector = {
  getClientDetails: () => {
    return createSelector(
      [(state) => state.meetings.clientDetails],
      (clientDetails) => clientDetails
    );
  },
  getBookingDetails: () => {
    return createSelector(
      [(state) => state.meetings.bookingDetails],
      (bookingDetails) => bookingDetails
    );
  },
  getBookingList: () => {
    return createSelector(
      [(state) => state.meetings.bookingList],
      (bookingList) => bookingList
    );
  },
  getRoomList: () => {
    return createSelector(
      [(state) => state.meetings.roomList],
      (roomList) => roomList
    );
  },
};
