import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getUserDetails,
  selectIsLoading,
  updateUser,
} from "../../store/slices/usersSlice";
import FormUser from "./FormUser";
import Loader from "../../components/Loader";
import { formatDate } from "../../utils";
import MainContainer from "../../components/MainContainer";
import { UserInitialState, UserType } from "../../@types/users";

function UpdateUser() {
  const [initialState, setInitialState] = useState({} as UserInitialState);
  const isLoading = useAppSelector(selectIsLoading);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmitAction(data: UserType) {
    await dispatch(updateUser({ body: data, id: data.id })).unwrap();
    navigate(`/dashboard-app/users/${id}`);
  }

  async function configInitialState() {
    if (id) {
      const payload = await dispatch(getUserDetails(id)).unwrap();
      if (payload.data) {
        setInitialState({
          ...payload.data,
          startDate: formatDate(payload.data.startDate)[2],
        });
      }
    }
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
    <FormUser
      initialState={initialState}
      onSubmitAction={onSubmitAction}
      verifyPassword={false}
    />
  );
}

export default UpdateUser;
