import React, { useEffect, useState } from "react";
import bcryprt from "bcryptjs";
import { useParams } from "react-router-dom";
import { getItemData } from "../../mockService/service";
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

const availableRoles = [
  "(Select one role)",
  "Manager",
  "Receptionist",
  "Room Services",
];
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

function NewUser() {
  const [newUser, setNewUser] = useState(initialState);
  const [verifyPass, setVerifyPass] = useState("");
  const { id } = useParams();

  function handleInputsChange(e) {
    const copyOfData = { ...newUser };
    const key = e.target.name;
    const value = e.target.value;
    copyOfData[key] = value;
    setNewUser(copyOfData);
  }

  function verifyForm(data) {
    for (const key in data) {
      if (key === "id") continue;
      if (!data[key]) return false;
    }
    if (data.password !== verifyPass) return false;
    return true;
  }

  function hashPassword(password) {
    const salt = bcryprt.genSaltSync(10);
    return bcryprt.hashSync(password, salt);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const copyOfData = { ...newUser };
    const correctForm = verifyForm(copyOfData);
    if (correctForm) {
      const randomNumber = Math.round(Math.random() * 10000);
      copyOfData.id = `newId-${randomNumber}`;
      copyOfData.password = hashPassword(copyOfData.password);
      console.log(copyOfData);
      setNewUser(initialState);
      setVerifyPass("");
    } else {
      console.log("Something was wrong");
    }
  }

  async function getUserData() {
    const data = await getItemData("users_data.json", id);
    setNewUser(data);
  }

  useEffect(() => {
    if (id) {
      getUserData();
    }
  }, []);

  return (
    <MainContainer style={{ minHeight: "calc(100vh - 145px)" }}>
      <Container>
        <Title>Add a new User</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label>Photo</Label>
              <Input
                name="photo"
                value={newUser.photo}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Full Name</Label>
              <Input
                name="fullName"
                value={newUser.fullName}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Phone Number</Label>
              <Input
                name="contact"
                value={newUser.contact}
                onChange={handleInputsChange}
              />
            </Field>
            {!id && (
              <>
                <Field>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputsChange}
                  />
                </Field>
                <Field>
                  <Label>Repeat Password</Label>
                  <Input
                    type="password"
                    value={verifyPass}
                    onChange={(e) => setVerifyPass(e.target.value)}
                  />
                </Field>
              </>
            )}
          </Column>
          <Column>
            <Field>
              <Label>Role</Label>
              <Select
                name="role"
                value={newUser.role}
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
              <Label>Status</Label>
              <Button
                variant={newUser.status === "ACTIVE" ? 1 : 4}
                name="status"
                value="ACTIVE"
                onClick={handleInputsChange}
              >
                ACTIVE
              </Button>
              <Button
                variant={newUser.status === "INACTIVE" ? 1 : 4}
                name="status"
                value="INACTIVE"
                onClick={handleInputsChange}
              >
                INACTIVE
              </Button>
            </Field>
            <Field>
              <Label>Start Date</Label>
              <Input
                name="startDate"
                value={newUser.startDate}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Function Description</Label>
              <TextArea
                name="description"
                value={newUser.description}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              {id ? "SAVE" : "CREATE"}
            </Button>
          </Submit>
        </FormContainer>
      </Container>
    </MainContainer>
  );
}

export default NewUser;
