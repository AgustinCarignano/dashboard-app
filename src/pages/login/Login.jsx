import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContext";
import { getItemData } from "../../utils";
import Button from "../../components/Button";
import { themeContext } from "../../context/ThemeContext";

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
`;

function Login() {
  const { state, dispatch } = useContext(loginContext);
  const [userName, setUserName] = useState("agustinC");
  const [password, setPassword] = useState("12345");
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

  async function getUserData() {
    const data = await getItemData("users_data.json", "705693001-8");
    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (userName === "agustinC" && password === "12345") {
      const user = await getUserData();
      dispatch({
        type: "login",
        payload: {
          fullName: user.fullName,
          email: user.email,
          photo: user.photo,
        },
      });
    }
  }

  useEffect(() => {
    if (state.auth) {
      return navigate("/dashboard-app/");
    }
  }, [state, navigate]);

  return (
    <FormContainer theme={theme}>
      <Form onSubmit={handleSubmit} theme={theme}>
        <h1>Type Your Credentials </h1>
        <Field>
          <label htmlFor="userName">User name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </Field>
        <Field>
          <label htmlFor="password">Pasword</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Field>
        <Button variant={1} onClick={handleSubmit}>
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Login;
