import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetails,
  selectIsLoading,
  updateUser,
} from "../../store/slices/usersSlice";
import FormUser from "./FormUser";
import Loader from "../../components/Loader";
import { formatDate } from "../../utils";
import MainContainer from "../../components/MainContainer";

function UpdateUser() {
  const [initialState, setInitialState] = useState({});
  const isLoading = useSelector(selectIsLoading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmitAction(data) {
    await dispatch(updateUser({ body: data, id: data.id })).unwrap();
    navigate(`/users/${id}`);
  }

  async function configInitialState() {
    const payload = await dispatch(getUserDetails(id)).unwrap();
    setInitialState({
      ...payload.data,
      startDate: formatDate(payload.data.startDate)[2],
    });
  }

  useEffect(() => {
    configInitialState();
  }, []);

  if (!Object.keys(initialState).includes("fullName" || isLoading))
    return (
      <MainContainer>
        <Loader />
      </MainContainer>
    );

  return (
    <FormUser initialState={initialState} onSubmitAction={onSubmitAction} />
  );
}

export default UpdateUser;
