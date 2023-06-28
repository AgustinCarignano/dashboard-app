import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createUser } from "../../store/slices/usersSlice";
import FormUser from "./FormUser";

function NewUser() {
  const dispatch = useDispatch();
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

  async function onSubmitAction(data) {
    const payload = await dispatch(createUser(data)).unwrap();
    navigate(`/users/${payload.data.id}`);
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

/* 
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
*/
