import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    return navigate("/bookings");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User name</label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <label htmlFor="password">Pasword</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" value="Enter" />
      </form>
    </div>
  );
}

export default Login;
