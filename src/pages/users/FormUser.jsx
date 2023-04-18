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

const availableRoles = [
  "(Select one role)",
  "Manager",
  "Receptionist",
  "Room Services",
];

function FormUser(props) {
  const { initialState, onSubmitAction, verifyPassword } = props;
  const [user, setUser] = useState({});
  const [controlPassword, setControlPassword] = useState("");
  const { theme } = useContext(themeContext);

  function handleInputsChange(e) {
    const copyOfData = { ...user };
    const key = e.target.name;
    const value = e.target.value;
    copyOfData[key] = value;
    setUser(copyOfData);
  }

  function verifyForm(data) {
    for (const key in data) {
      if (key === "id") continue;
      if (!data[key]) return false;
    }
    if (verifyPassword && data.password !== controlPassword) return false;
    return true;
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const copyOfData = { ...user };
    const correctForm = verifyForm(copyOfData);
    if (correctForm) {
      copyOfData.startDate = new Date(copyOfData.startDate).getTime();
      onSubmitAction(copyOfData);
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
    <MainContainer style={{ minHeight: "calc(100vh - 145px)" }}>
      <Container theme={theme}>
        <Title theme={theme}>{user.id ? "Edit User" : "New User"}</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label theme={theme}>Photo</Label>
              <Input
                theme={theme}
                name="photo"
                value={user.photo}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Full Name</Label>
              <Input
                theme={theme}
                name="fullName"
                value={user.fullName}
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
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Phone Number</Label>
              <Input
                theme={theme}
                name="contact"
                value={user.contact}
                onChange={handleInputsChange}
              />
            </Field>
            {!user.id && (
              <>
                <Field>
                  <Label theme={theme}>Password</Label>
                  <Input
                    theme={theme}
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputsChange}
                  />
                </Field>
                <Field>
                  <Label theme={theme}>Repeat Password</Label>
                  <Input
                    theme={theme}
                    type="password"
                    value={controlPassword}
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
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Function Description</Label>
              <TextArea
                theme={theme}
                name="description"
                value={user.description}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              {user.id ? "SAVE" : "CREATE"}
            </Button>
          </Submit>
        </FormContainer>
      </Container>
    </MainContainer>
  );
}

export default FormUser;
