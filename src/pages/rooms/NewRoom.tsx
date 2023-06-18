import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { createRoom } from "../../store/slices/roomSlice";
import FormRoom from "./FormRoom";
import { RoomType } from "../../@types/rooms";

function NewRoom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialState: RoomType = {
    _id: " ",
    photos: ["", "", ""],
    roomType: "",
    description: "",
    roomNumber: 0,
    offer: false,
    price: 0,
    discount: 0,
    cancellation: "",
    status: "Available",
    amenities: [],
  };

  async function onSubmitAction(data: RoomType) {
    const payload = await dispatch(createRoom(data)).unwrap();
    navigate(`/dashboard-app/rooms/${payload.data._id}`);
  }

  return (
    <FormRoom initialState={initialState} onSubmitAction={onSubmitAction} />
  );
}

export default NewRoom;
