import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./components/bookings/Bookings";
import Contact from "./components/contact/Contact";
import Dashboard from "./components/deshboard/Dashboard";
import Login from "./components/login/Login";
import Rooms from "./components/rooms/Rooms";
import RequiredAuth from "./components/sharedComponents/RequiredAuth";
import Users from "./components/users/Users";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth"));

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", auth);
    } else {
      localStorage.removeItem("auth");
    }
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<Login auth={auth} setAuth={setAuth} />}
          />
          <Route
            path="/"
            element={
              <RequiredAuth auth={auth}>
                <Dashboard />
              </RequiredAuth>
            }
          />
          <Route
            path="/bookings"
            element={
              <RequiredAuth auth={auth}>
                <Bookings />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/bookings/:id"
            element={
              <RequiredAuth auth={auth}>
                <Bookings />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/rooms"
            element={
              <RequiredAuth auth={auth}>
                <Rooms />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/rooms/:id"
            element={
              <RequiredAuth auth={auth}>
                <Rooms />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/rooms/create-room"
            element={
              <RequiredAuth auth={auth}>
                <Rooms />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/rooms/update-room/:id"
            element={
              <RequiredAuth auth={auth}>
                <Rooms />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <RequiredAuth auth={auth}>
                <Users />
              </RequiredAuth>
            }
          />
          <Route
            path="/users/:id"
            element={
              <RequiredAuth auth={auth}>
                <Users />
              </RequiredAuth>
            }
          />
          <Route
            path="/users/create-user"
            element={
              <RequiredAuth auth={auth}>
                <Users />
              </RequiredAuth>
            }
          />
          <Route
            path="/users/update-user/:id"
            element={
              <RequiredAuth auth={auth}>
                <Users />
              </RequiredAuth>
            }
          />
          <Route
            path="/contact"
            element={
              <RequiredAuth auth={auth}>
                <Contact />
              </RequiredAuth>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
