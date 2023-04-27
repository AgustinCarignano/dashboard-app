import React from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../store/slices/usersSlice";
import FormUser from "./FormUser";
import { UserType } from "../../@types/users";
import { useAppDispatch } from "../../hooks/hooks";

function NewUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialState = {
    photo: "",
    fullName: "",
    id: "",
    email: "",
    startDate: "",
    description: "",
    contact: "",
    status: "ACTIVE",
    role: "",
    password: "",
  };

  async function onSubmitAction(data: UserType) {
    const payload = await dispatch(createUser(data)).unwrap();
    navigate(`/dashboard-app/users/${payload.data.id}`);
  }

  return (
    <FormUser
      initialState={initialState}
      onSubmitAction={onSubmitAction}
      verifyPassword={true}
    />
  );
}

export default NewUser;
