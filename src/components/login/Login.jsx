import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../sharedComponents/Button";

const FormContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-top: 10%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  margin: 0 auto;
  background-color: #fff;
  padding: 50px;
  gap: 40px;
  border-radius: 30px;
  box-shadow: 0px 30px 16px rgba(0, 0, 0, 0.25);
  color: #262626;
  .title {
    font: normal 600 40px/60px Poppins, Sans-serif;
    text-align: center;
    letter-spacing: 0.09em;
    margin-bottom: 20px;
    width: 80%;
  }
  .field {
    display: flex;
    gap: 30px;
    align-items: center;
  }
  .label {
    font: normal 400 24px/36px "Poppins", Sans-serif;
    text-align: right;
    width: 150px;
  }
  .input {
    border: solid 1px #ebebeb;
    border-radius: 8px;
    outline: none;
    padding: 10px;
    font: normal 400 24px/36px "Poppins", Sans-serif;
  }
  .btnSubmit {
    margin-top: 20px;
    font-size: 24px;
    padding: 20px 53px;
  }
`;

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = props;

  function handleSubmit(e) {
    e.preventDefault();
    if (userName === "AgustinCarignano" && password === "12345") {
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
        <div className="field">
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
        </div>
        <div className="field">
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
        </div>
        {/* <input type="submit" value="Enter" /> */}
        <Button className="btnSubmit" variant={1} onClick={handleSubmit}>
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Login;
