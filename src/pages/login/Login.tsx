import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContext";
import Button from "../../components/Button";
import { themeContext } from "../../context/ThemeContext";
import ErrorAlert from "../../components/ErrorAlert";
import { loginFecth } from "../../utils/fetchUtils";

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
    font: normal 400 18px/30px "Poppins", Sans-serif;
    min-width: 310px;
  }
  Button {
    margin-top: 20px;
    font-size: 24px;
    padding: 20px 53px;
  }
`;

const Field = styled.div<{ showError: boolean }>`
  display: flex;
  gap: 30px;
  align-items: center;
  input {
    border: ${(props) => (props.showError ? "#E23428 solid 1px" : "")};
  }
`;

const errorMessage = {
  standBy: {
    modal: false,
    email: false,
    password: false,
    message: "",
  },
  emptyEmail: {
    modal: true,
    email: true,
    password: false,
    message: "You must type an email",
  },
  emptyPassword: {
    modal: true,
    email: false,
    password: true,
    message: "You must type a user password",
  },
  wrongCredentials: {
    modal: true,
    email: true,
    password: true,
    message: "Invalid Email or Password",
  },
  serverError: {
    modal: true,
    email: false,
    password: false,
    message: "There has been an internal error. Try again.",
  },
};

function Login() {
  const { loginState, loginActionTypes, dispatchLogin } =
    useContext(loginContext) || {};
  const [credentials, setCredentials] = useState({
    email: "agustin.carignano@gmail.com",
    password: "12345",
  });
  const [showAlert, setShowAlert] = useState(errorMessage.standBy);
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

  function handleInputChange(e: React.BaseSyntheticEvent) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setShowAlert({ ...showAlert, [name]: false });
  }

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    if (!credentials.email) {
      return setShowAlert(errorMessage.emptyEmail);
    } else if (!credentials.password) {
      return setShowAlert(errorMessage.emptyPassword);
    } else {
      try {
        const { token, user } = await loginFecth(credentials);
        if (token) {
          localStorage.setItem(
            "token",
            JSON.stringify({ token, setAt: new Date().getTime() })
          );
          if (!dispatchLogin || !loginActionTypes) return;
          dispatchLogin({
            type: loginActionTypes.LOGIN,
            payload: {
              fullName: user.fullName ?? "",
              email: user.email ?? "",
              photo: user.photo ?? "",
            },
          });
        }
      } catch (error: any) {
        console.error(error);
        if (error.message === "401") {
          return setShowAlert(errorMessage.wrongCredentials);
        } else {
          return setShowAlert(errorMessage.serverError);
        }
      }
    }
  }

  useEffect(() => {
    if (loginState?.auth) {
      return navigate("/dashboard-app/");
    }
  }, [loginState, navigate]);

  return (
    <FormContainer theme={theme}>
      <Form onSubmit={handleSubmit} theme={theme}>
        <h1>Type Your Credentials </h1>
        <Field showError={showAlert.email}>
          <label htmlFor="email">Email</label>
          <input
            data-cy="email"
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            onChange={handleInputChange}
            value={credentials.email}
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
          toggleVisibility={() => setShowAlert({ ...showAlert, modal: false })}
          message={showAlert.message}
          dataCy="loginErrorMessage"
          textBtn="Try again"
        />
      )}
    </FormContainer>
  );
}

export default Login;
