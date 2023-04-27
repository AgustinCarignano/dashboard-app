import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { createBooking } from "../../store/slices/bookingSlice";
import FormBooking from "./FormBooking";
import { BookingType } from "../../@types/bookings";

function NewBooking() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    guest: "",
    specialRequest: "",
    orderDate: new Date().getTime().toString(),
    roomType: "",
    roomNumber: "",
    status: "Check In",
    checkIn: "",
    checkOut: "",
    roomId: "",
    roomImg: "",
  };

  async function onSubmitAction(data: BookingType) {
    const payload = await dispatch(createBooking(data)).unwrap();
    navigate(`/dashboard-app/bookings/${payload.data.id}`);
  }

  return (
    <FormBooking initialState={initialState} onSubmitAction={onSubmitAction} />
  );
}

export default NewBooking;
