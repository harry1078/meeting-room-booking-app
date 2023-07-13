import React, { useEffect } from "react";
import { ContentWrapper } from "./ContentWrapper";
import BookingList from "./Bookings/BookingList";
import axios from "../../API/axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { meetingStateAction, setBookingList } from "../../Redux/slice";
import RoomList from "./Rooms/RoomList";
import { adminModuleSelector } from "../../Redux/selectors";

export const Rooms = () => {
  const dispatch = useDispatch();
  const getRoomList = useSelector(adminModuleSelector.getRoomList());

  //FETCH BOOKINGS
  const getAllRoomsDetail = async () => {
    const response = await axios.get("/rooms");
    const allRooms = response.data;
    console.log(allRooms);
    // if (allRooms) {
    //   dispatch(meetingStateAction.setRoomList(allRooms));
    // }
  };

  useEffect(() => {
    console.log("useEffect");
    getAllRoomsDetail();
  }, []);

  console.log(getRoomList, "getRoomList");

  // //DELETE BOOKINGS
  // const deleteBooking = async (id) => {
  //   await axios.delete(`/bookings/${id}`);
  //   const newBookingList = getBookingList.filter((booking) => {
  //     return booking.id !== id;
  //   });
  //   Swal.fire({
  //     title: "Deleted!",
  //     text: "Your file has been deleted.",
  //     icon: "success",
  //     allowOutsideClick: false,
  //   });
  //   dispatch(meetingStateAction.setBookingList(newBookingList));
  // };

  // const filterData = (value) => {
  //   if (value) {
  //     const filterByRoomType = getBookingList.filter((booking) => {
  //       return booking.room === value.label;
  //     });
  //     dispatch(meetingStateAction.setBookingList(filterByRoomType));
  //   } else {
  //     getAllRoomsDetail();
  //   }
  // };

  // const filterDataByStatus = (value) => {
  //   if (value) {
  //     const filterByStatus = getBookingList.filter((booking) => {
  //       return booking.status === value.label;
  //     });
  //     dispatch(meetingStateAction.setBookingList(filterByStatus));
  //   } else {
  //     getAllRoomsDetail();
  //   }
  // };

  // const filterAllDetails = () => {
  //   return getAllRoomsDetail();
  // };

  return (
    <ContentWrapper>
      <RoomList />
    </ContentWrapper>
  );
};
