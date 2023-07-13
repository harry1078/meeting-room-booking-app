import React, { useEffect } from "react";
import { ContentWrapper } from "./ContentWrapper";
import BookingList from "./Bookings/BookingList";
import axios from "../../API/axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { meetingStateAction, setBookingList } from "../../Redux/slice";
import { adminModuleSelector } from "../../Redux/selectors";

export const Bookings = () => {
  const dispatch = useDispatch();
  const getBookingList = useSelector(adminModuleSelector.getBookingList());

  //FETCH BOOKINGS
  const getAllBookings = async () => {
    const response = await axios.get("/bookings");
    const allBookings = response.data;
    dispatch(meetingStateAction.setBookingList(allBookings));
  };

  useEffect(() => {
    console.log("useEffect");
    getAllBookings();
  }, []);

  //DELETE BOOKINGS
  const deleteBooking = async (id) => {
    await axios.delete(`/bookings/${id}`);
    const newBookingList = getBookingList.filter((booking) => {
      return booking.id !== id;
    });
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      allowOutsideClick: false,
    });
    dispatch(meetingStateAction.setBookingList(newBookingList));
  };

  const filterData = (value) => {
    if (value) {
      const filterByRoomType = getBookingList.filter((booking) => {
        return booking.room === value.label;
      });
      dispatch(meetingStateAction.setBookingList(filterByRoomType));
    } else {
      getAllBookings();
    }
  };

  const filterDataByStatus = (value) => {
    if (value) {
      const filterByStatus = getBookingList.filter((booking) => {
        return booking.status === value.label;
      });
      dispatch(meetingStateAction.setBookingList(filterByStatus));
    } else {
      getAllBookings();
    }
  };

  const filterAllDetails = () => {
    return getAllBookings();
  };

  return (
    <ContentWrapper>
      <BookingList
        rows={getBookingList}
        deleteRecord={deleteBooking}
        filterData={filterData}
        filterDataByStatus={filterDataByStatus}
        filterAllDetails={filterAllDetails}
      />
    </ContentWrapper>
  );
};
