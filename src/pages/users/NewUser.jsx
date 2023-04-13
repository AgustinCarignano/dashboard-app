import React, { useContext, useEffect, useState } from "react";
import bcryprt from "bcryptjs";
import { useNavigate, useParams } from "react-router-dom";
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
import { formatDate } from "../../utils";
import { themeContext } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "./usersSlice";

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
  const { theme } = useContext(themeContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!id && data.password !== verifyPass) return false;
    return true;
  }

  function hashPassword(password) {
    const salt = bcryprt.genSaltSync(10);
    return bcryprt.hashSync(password, salt);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const copyOfData = { ...newUser };
    const correctForm = verifyForm(copyOfData);
    if (correctForm) {
      copyOfData.startDate = new Date(copyOfData.startDate).getTime();
      if (id) {
        try {
          await dispatch(updateUser({ body: copyOfData, id })).unwrap();
          navigate(`dashboard-app/users/${id}`);
        } catch (error) {
          console.log("there has been an error", error);
        }
      } else {
        dispatch(createUser(copyOfData));
      }
      setNewUser(initialState);
      setVerifyPass("");
    } else {
      console.log("Something was wrong");
    }
    /* if (correctForm) {
      if (!id) {
        const randomNumber = Math.round(Math.random() * 10000);
        copyOfData.id = `newId-${randomNumber}`;
        copyOfData.password = hashPassword(copyOfData.password);
      }
      copyOfData.startDate = new Date(copyOfData.startDate).getTime();
      console.log(copyOfData);
      setNewUser(initialState);
      setVerifyPass("");
    } else {
      console.log("Something was wrong");
    } */
  }

  async function getUserData() {
    const data = await getItemData("users_data.json", id);
    data.startDate = formatDate(data.startDate)[2];
    setNewUser(data);
  }

  useEffect(() => {
    if (id) {
      getUserData();
    }
  }, []);

  return (
    <MainContainer style={{ minHeight: "calc(100vh - 145px)" }}>
      <Container theme={theme}>
        <Title theme={theme}>{id ? "Edit User" : "New User"}</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label theme={theme}>Photo</Label>
              <Input
                theme={theme}
                name="photo"
                value={newUser.photo}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Full Name</Label>
              <Input
                theme={theme}
                name="fullName"
                value={newUser.fullName}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Email Address</Label>
              <Input
                theme={theme}
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Phone Number</Label>
              <Input
                theme={theme}
                name="contact"
                value={newUser.contact}
                onChange={handleInputsChange}
              />
            </Field>
            {!id && (
              <>
                <Field>
                  <Label theme={theme}>Password</Label>
                  <Input
                    theme={theme}
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputsChange}
                  />
                </Field>
                <Field>
                  <Label theme={theme}>Repeat Password</Label>
                  <Input
                    theme={theme}
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
              <Label theme={theme}>Role</Label>
              <Select
                theme={theme}
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
              <Label theme={theme}>Status</Label>
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
              <Label theme={theme}>Start Date</Label>
              <Input
                theme={theme}
                name="startDate"
                type="date"
                value={newUser.startDate}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Function Description</Label>
              <TextArea
                theme={theme}
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
