import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getBookingDetails,
  selectBookingDetail,
  selectIsLoading,
  updateBooking,
} from "../../store/slices/bookingSlice";
import { formatDate } from "../../utils";
import FormBooking from "./FormBooking.jsx";
import Loader from "../../components/Loader";
import MainContainer from "../../components/MainContainer";

function UpdateBooking() {
  const bookingData = useSelector(selectBookingDetail);
  const isLoading = useSelector(selectIsLoading);
  const [initialState, setInitialState] = useState({});
  const [currentRoom, setCurrentRoom] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmitAction(data) {
    await dispatch(updateBooking({ body: data, id: data.id })).unwrap();
    navigate(`/dashboard-app/bookings/${data.id}`);
  }

  function configInitialState() {
    const clone = { ...bookingData };
    clone.checkIn = formatDate(bookingData.checkIn)[2];
    clone.checkOut = formatDate(bookingData.checkOut)[2];
    const { roomId, roomType, roomNumber } = clone;
    setCurrentRoom({ roomId, roomType, roomNumber });
    setInitialState(clone);
  }

  useEffect(() => {
    if (bookingData.id !== id) {
      dispatch(getBookingDetails(id));
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
