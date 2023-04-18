import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBooking } from "../../store/slices/bookingSlice";
import FormBooking from "./FormBooking";

function NewBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    guest: "",
    specialRequest: "",
    orderDate: new Date().getTime(),
    roomType: "",
    roomNumber: "",
    status: "Check In",
    checkIn: "",
    checkOut: "",
    roomId: "",
  };

  async function onSubmitAction(data) {
    await dispatch(createBooking(data)).unwrap();
    navigate("/dashboard-app/bookings");
  }

  return (
    <FormBooking initialState={initialState} onSubmitAction={onSubmitAction} />
  );
}

export default NewBooking;
