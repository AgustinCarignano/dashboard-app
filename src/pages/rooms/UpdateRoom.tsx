import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getRoomDetails,
  selectIsLoading,
  selectRoomDetails,
  updateRoom,
} from "../../store/slices/roomSlice";
import FormRoom from "./FormRoom";
import Loader from "../../components/Loader";
import MainContainer from "../../components/MainContainer";
import { RoomType } from "../../@types/rooms";

function UpdateRoom() {
  const roomData = useAppSelector(selectRoomDetails);
  const isLoading = useAppSelector(selectIsLoading);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmitAction(data: RoomType) {
    await dispatch(updateRoom({ body: data, id: data._id })).unwrap();
    navigate(`/dashboard-app/rooms/${id}`);
  }

  useEffect(() => {
    if (id) dispatch(getRoomDetails(id));
  }, [dispatch, id]);

  return isLoading ? (
    <MainContainer>
      <Loader />
    </MainContainer>
  ) : (
    <FormRoom
      initialState={structuredClone(roomData)}
      onSubmitAction={onSubmitAction}
    />
  );
}

export default UpdateRoom;
