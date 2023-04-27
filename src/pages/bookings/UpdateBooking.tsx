import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getBookingDetails,
  selectBookingDetail,
  selectIsLoading,
  updateBooking,
} from "../../store/slices/bookingSlice";
import { formatDate } from "../../utils";
import FormBooking from "./FormBooking";
import Loader from "../../components/Loader";
import MainContainer from "../../components/MainContainer";
import {
  BookingInitialState,
  BookingType,
  ExtraRoom,
} from "../../@types/bookings";

function UpdateBooking() {
  const bookingData = useAppSelector(selectBookingDetail);
  const isLoading = useAppSelector(selectIsLoading);
  const [initialState, setInitialState] = useState({} as BookingInitialState);
  const [currentRoom, setCurrentRoom] = useState({} as ExtraRoom);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmitAction(data: BookingType) {
    await dispatch(updateBooking({ body: data, id: data.id })).unwrap();
    navigate(`/dashboard-app/bookings/${data.id}`);
  }

  function configInitialState() {
    // const clone = { ...bookingData };
    // clone.checkIn = formatDate(bookingData.checkIn)[2];
    // clone.checkOut = formatDate(bookingData.checkOut)[2];
    if (bookingData.checkIn && bookingData.checkOut && bookingData.orderDate) {
      const newCheckIn = formatDate(bookingData.checkIn)[2];
      const newCheckOut = formatDate(bookingData.checkOut)[2];
      const newOrderDate = formatDate(bookingData.orderDate)[2];
      const { roomId, roomType, roomNumber } = bookingData;
      setCurrentRoom({ roomId, roomType, roomNumber });
      setInitialState({
        ...bookingData,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        orderDate: newOrderDate,
      });
    }
  }

  useEffect(() => {
    if (bookingData.id !== id) {
      if (id) dispatch(getBookingDetails(id));
    } else {
      configInitialState();
    }
  }, [dispatch, id]);

  useEffect(() => {
    configInitialState();
  }, [bookingData]);

  /* async function configInitialState() {
    const payload = await dispatch(getBookingDetails(id)).unwrap();
    const clone = { ...payload.data };
    clone.checkIn = formatDate(bookingData.checkIn)[2];
    clone.checkOut = formatDate(bookingData.checkOut)[2];
    const { roomId, roomType, roomNumber } = clone;
    setCurrentRoom({ roomId, roomType, roomNumber });
    setInitialState(clone);
  }

  useEffect(() => {
    configInitialState();
  }, [dispatch]); */

  if (!Object.keys(initialState).includes("guest") || isLoading)
    return (
      <MainContainer>
        <Loader />
      </MainContainer>
    );

  return (
    <FormBooking
      initialState={initialState}
      extraRoom={currentRoom}
      onSubmitAction={onSubmitAction}
    />
  );
}

export default UpdateBooking;
