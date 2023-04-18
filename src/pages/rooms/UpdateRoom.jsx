import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRoomDetails,
  selectIsLoading,
  selectRoomDetails,
  updateRoom,
} from "../../store/slices/roomSlice";
import FormRoom from "./FormRoom";
import Loader from "../../components/Loader";
import MainContainer from "../../components/MainContainer";

function UpdateRoom() {
  const roomData = useSelector(selectRoomDetails);
  const isLoading = useSelector(selectIsLoading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmitAction(data) {
    await dispatch(updateRoom({ body: data, id: data.id })).unwrap();
    navigate(`/dashboard-app/rooms/${id}`);
  }

  useEffect(() => {
    dispatch(getRoomDetails(id));
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
