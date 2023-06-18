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
    _id: "",
    guest: "",
    specialRequest: "",
    orderDate: new Date().toISOString(),
    roomType: "",
    roomNumber: 0,
    status: "Check In",
    checkIn: "",
    checkOut: "",
    roomId: "",
    roomImg: "",
  };

  async function onSubmitAction(data: BookingType) {
    console.log(data);
    const payload = await dispatch(createBooking(data)).unwrap();
    navigate(`/dashboard-app/bookings/${payload.data._id}`);
  }

  return (
    <FormBooking initialState={initialState} onSubmitAction={onSubmitAction} />
  );
}

export default NewBooking;
