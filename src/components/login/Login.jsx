import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../sharedComponents/Button";

const FormContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 145px);
  background-color: #f8f8f8;
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
  background-color: #fff;
  padding: 50px;
  gap: 40px;
  border-radius: 30px;
  box-shadow: 0px 30px 16px rgba(0, 0, 0, 0.25);
  color: #262626;
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
    border: solid 1px #ebebeb;
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

const Credentials = styled.div`
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 14px;
`;

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = props;

  function handleSubmit(e) {
    e.preventDefault();
    if (userName === "agustinC" && password === "12345") {
      setAuth(true);
    }
  }

  if (auth) {
    console.log(auth);
    return navigate("/dashboard-app/");
  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h1 className="title">Type Your Credentials </h1>
        <Field>
          <label className="label" htmlFor="userName">
            User name
          </label>
          <input
            className="input"
            type="text"
            name="userName"
            id="userName"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </Field>
        <Field>
          <label className="label" htmlFor="password">
            Pasword
          </label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Field>
        {/* <input type="submit" value="Enter" /> */}
        <Button variant={1} onClick={handleSubmit}>
          Sign In
        </Button>
        <Credentials>
          <p>User: agustinC</p>
          <p>Password: 12345</p>
        </Credentials>
      </Form>
    </FormContainer>
  );
}

export default Login;
