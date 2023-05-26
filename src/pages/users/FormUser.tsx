import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import {
  Container,
  Title,
  FormContainer,
  Column,
  Field,
  Label,
  Input,
  Select,
  TextArea,
  Submit,
} from "../../components/FormComponents";
import { themeContext } from "../../context/ThemeContext";
import Loader from "../../components/Loader";
import ErrorAlert from "../../components/ErrorAlert";
import { UserInitialState, UserType } from "../../@types/users";

const availableRoles = [
  "(Select one role)",
  "Manager",
  "Receptionist",
  "Room Services",
];

type PropsType = {
  initialState: UserInitialState;
  onSubmitAction: (data: UserType) => Promise<void>;
  verifyPassword: boolean;
};

function FormUser(props: PropsType) {
  const { initialState, onSubmitAction, verifyPassword } = props;
  const [user, setUser] = useState({} as UserInitialState);
  const [controlPassword, setControlPassword] = useState("");
  const [submitError, setSubmitError] = useState({
    hasError: false,
    photo: false,
    fullName: false,
    email: false,
    startDate: false,
    description: false,
    contact: false,
    role: false,
    password: false,
  });
  const { theme } = useContext(themeContext);

  function handleInputsChange(e: React.BaseSyntheticEvent) {
    const copyOfData = { ...user };
    const copyOfSubmitError = { ...submitError };
    const key: string = e.target.name;
    const value: string = e.target.value;
    copyOfData[key as keyof UserType] = value;
    copyOfSubmitError[key as keyof typeof submitError] = false;
    setUser(copyOfData);
    setSubmitError(copyOfSubmitError);
  }

  function verifyForm(data: UserInitialState) {
    const errorObj = { ...submitError };
    let isValid = true;
    for (const key in data) {
      if (key === "_id") continue;
      if (!data[key as keyof UserType]) {
        errorObj[key as keyof typeof errorObj] = true;
        isValid = false;
        continue;
      }
    }
    if (verifyPassword && data.password !== controlPassword) {
      errorObj["password"] = true;
      isValid = false;
    }
    if (!isValid) errorObj.hasError = true;
    setSubmitError(errorObj);
    return isValid;
  }

  async function handleOnSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const correctForm = verifyForm(user);
    if (correctForm) {
      const newDate = new Date(user.startDate).getTime();
      onSubmitAction({ ...user, startDate: newDate });
    } else {
      console.log("Something was wrong");
    }
  }

  useEffect(() => {
    setUser(initialState);
  }, []);

  if (!Object.keys(user).includes("fullName"))
    return (
      <MainContainer>
        <Loader />
      </MainContainer>
    );

  return (
    <MainContainer>
      <Container theme={theme}>
        <Title theme={theme}>{user._id ? "Edit User" : "New User"}</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label theme={theme}>Photo</Label>
              <Input
                theme={theme}
                name="photo"
                value={user.photo}
                hasError={submitError.photo}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Full Name</Label>
              <Input
                theme={theme}
                name="fullName"
                value={user.fullName}
                hasError={submitError.fullName}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Email Address</Label>
              <Input
                theme={theme}
                type="email"
                name="email"
                value={user.email}
                hasError={submitError.email}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Phone Number</Label>
              <Input
                theme={theme}
                name="contact"
                value={user.contact}
                hasError={submitError.contact}
                onChange={handleInputsChange}
              />
            </Field>
            {!user._id && (
              <>
                <Field>
                  <Label theme={theme}>Password</Label>
                  <Input
                    theme={theme}
                    type="password"
                    name="password"
                    value={user.password}
                    hasError={submitError.password}
                    onChange={handleInputsChange}
                  />
                </Field>
                <Field>
                  <Label theme={theme}>Repeat Password</Label>
                  <Input
                    theme={theme}
                    type="password"
                    value={controlPassword}
                    hasError={submitError.password}
                    onChange={(e) => setControlPassword(e.target.value)}
                  />
                </Field>
              </>
            )}
          </Column>
          <Column>
            <Field>
              <Label theme={theme}>Role</Label>
              <Select
                theme={theme}
                name="role"
                value={user.role}
                hasError={submitError.role}
                onChange={handleInputsChange}
              >
                {availableRoles.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={index === 0 ? "" : availableRoles[index]}
                      hidden={index === 0}
                    >
                      {item}
                    </option>
                  );
                })}
              </Select>
            </Field>
            <Field>
              <Label theme={theme}>Status</Label>
              <Button
                variant={user.status === "ACTIVE" ? 1 : 4}
                name="status"
                value="ACTIVE"
                onClick={handleInputsChange}
              >
                ACTIVE
              </Button>
              <Button
                variant={user.status === "INACTIVE" ? 1 : 4}
                name="status"
                value="INACTIVE"
                onClick={handleInputsChange}
              >
                INACTIVE
              </Button>
            </Field>
            <Field>
              <Label theme={theme}>Start Date</Label>
              <Input
                theme={theme}
                name="startDate"
                type="date"
                value={user.startDate}
                hasError={submitError.startDate}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Function Description</Label>
              <TextArea
                theme={theme}
                name="description"
                value={user.description}
                hasError={submitError.description}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              {user._id ? "SAVE" : "CREATE"}
            </Button>
          </Submit>
          {submitError.hasError && (
            <ErrorAlert
              toggleVisibility={() =>
                setSubmitError({ ...submitError, hasError: false })
              }
              message="Error: check the remark inputs"
              dataCy="users_form"
              textBtn="OK"
            />
          )}
        </FormContainer>
      </Container>
    </MainContainer>
  );
}

export default FormUser;
