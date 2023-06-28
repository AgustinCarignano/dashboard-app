import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContext";
import { getItemData } from "../../utils";
import Button from "../../components/Button";
import { themeContext } from "../../context/ThemeContext";
import { ModalContainer, ModalWindow } from "../../components/Modal";
import ErrorAlert from "../../components/ErrorAlert";

const FormContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 145px);
  background-color: ${(props) => props.theme[2]};
  padding-top: 30px;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  min-width: 650px;
  margin: 0 auto;
  background-color: ${(props) => props.theme[1]};
  padding: 40px;
  gap: 40px;
  border-radius: 30px;
  box-shadow: 0px 30px 16px ${(props) => props.theme[20]};
  color: ${(props) => props.theme[21]};
  h1 {
    font: normal 600 40px/60px Poppins, Sans-serif;
    text-align: center;
    letter-spacing: 0.09em;
    margin-bottom: 20px;
    width: 80%;
  }
  label {
    font: normal 400 24px/36px "Poppins", Sans-serif;
    text-align: right;
    width: 150px;
  }
  input {
    border: solid 1px ${(props) => props.theme[7]};
    background-color: ${(props) => props.theme[1]};
    color: ${(props) => props.theme[17]};
    border-radius: 8px;
    outline: none;
    padding: 10px;
    font: normal 400 24px/36px "Poppins", Sans-serif;
  }
  Button {
    margin-top: 20px;
    font-size: 24px;
    padding: 20px 53px;
  }
`;

const Field = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  input {
    border: ${(props) => (props.showError ? "#E23428 solid 1px" : "")};
  }
`;

function Login() {
  const { loginState, loginActionTypes, dispatchLogin } =
    useContext(loginContext);
  const [credentials, setCredentials] = useState({
    userName: "agustinC",
    password: "12345",
  });
  const [showAlert, setShowAlert] = useState({
    modal: false,
    userName: false,
    password: false,
    message: "",
  });
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

  async function getUserData() {
    const data = await getItemData("users_data.json", "705693001-8");
    return data;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setShowAlert({ ...showAlert, [name]: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      credentials.userName === "agustinC" &&
      credentials.password === "12345"
    ) {
      const user = await getUserData();
      dispatchLogin({
        type: loginActionTypes.LOGIN,
        payload: {
          fullName: user.fullName,
          email: user.email,
          photo: user.photo,
        },
      });
    } else {
      if (!credentials.userName) {
        return setShowAlert({
          modal: true,
          userName: true,
          password: false,
          message: "You must type a user name",
        });
      } else if (!credentials.password) {
        return setShowAlert({
          modal: true,
          userName: false,
          password: true,
          message: "You must type a password",
        });
      } else {
        return setShowAlert({
          modal: true,
          userName: true,
          password: true,
          message: "Invalid User Name or Password",
        });
      }
    }
  }

  useEffect(() => {
    if (loginState.auth) {
      return navigate("/");
    }
  }, [loginState, navigate]);

  return (
    <FormContainer theme={theme}>
      <Form onSubmit={handleSubmit} theme={theme}>
        <h1>Type Your Credentials </h1>
        <Field showError={showAlert.userName}>
          <label htmlFor="userName">User name</label>
          <input
            data-cy="userName"
            type="text"
            name="userName"
            id="userName"
            autoComplete="off"
            onChange={handleInputChange}
            value={credentials.userName}
          />
        </Field>
        <Field showError={showAlert.password}>
          <label htmlFor="password">Pasword</label>
          <input
            data-cy="password"
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={credentials.password}
          />
        </Field>
        <Button variant={1} onClick={handleSubmit}>
          Sign In
        </Button>
      </Form>
      {showAlert.modal && (
        <ErrorAlert
          toggleVisibity={() => setShowAlert({ ...showAlert, modal: false })}
          message={showAlert.message}
          dataCy="loginErrorMessage"
          textBtn="Try again"
        />
      )}
    </FormContainer>
  );
}

export default Login;

{
  /* <ModalContainer
          id="closeWindow"
          theme={theme}
          onClick={(e) => {
            e.target.id.includes("closeWindow") &&
              setShowAlert({ ...showAlert, modal: false });
          }}
        >
          <ModalWindow id="modalWindow" theme={theme}>
            <h3 data-cy="loginErrorMessage">{showAlert.message}</h3>
            <Button
              variant={2}
              onClick={() => setShowAlert({ ...showAlert, modal: false })}
            >
              Try again
            </Button>
          </ModalWindow>
        </ModalContainer> */
}
