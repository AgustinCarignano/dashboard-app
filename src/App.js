import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/bookings/Bookings";
import BookingDetail from "./pages/bookings/BookingDetail";
import Contact from "./pages/contact/Contact";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NewRoom from "./pages/rooms/NewRoom";
import RoomDetail from "./pages/rooms/RoomDetail";
import Rooms from "./pages/rooms/Rooms";
import NewUser from "./pages/users/NewUser";
import Users from "./pages/users/Users";
import UserDetail from "./pages/users/UserDetail";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequiredAuth";
import NewBooking from "./pages/bookings/NewBooking";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || false);
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [showSidebar, setShowSidebar] = useState(true);

  function handleSidebarVisibility() {
    setShowSidebar(!showSidebar);
  }

  function handleCheckOut() {
    setAuth(false);
  }

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", auth);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
    }
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Layout showAside={showSidebar}>
          <Aside
            sidebarVisibility={showSidebar}
            auth={auth}
            loggedUser={loggedUser}
          />
          <Header
            handleSidebarVisibility={handleSidebarVisibility}
            handleCheckOut={handleCheckOut}
            auth={auth}
          />

          <Routes>
            <Route
              path="/dashboard-app/login"
              element={
                <Login
                  auth={auth}
                  setAuth={setAuth}
                  setLoggedUser={setLoggedUser}
                />
              }
            />
            <Route
              path="/dashboard-app/"
              element={
                <RequiredAuth auth={auth}>
                  <Dashboard />
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/bookings"
              element={
                <RequiredAuth auth={auth}>
                  <Bookings />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/bookings/:id"
              element={
                <RequiredAuth auth={auth}>
                  <BookingDetail />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/bookings/create"
              element={
                <RequiredAuth auth={auth}>
                  <NewBooking />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/bookings/update/:id"
              element={
                <RequiredAuth auth={auth}>
                  <NewBooking />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms"
              element={
                <RequiredAuth auth={auth}>
                  <Rooms />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms/:id"
              element={
                <RequiredAuth auth={auth}>
                  <RoomDetail />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms/create"
              element={
                <RequiredAuth auth={auth}>
                  <NewRoom />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms/update/:id"
              element={
                <RequiredAuth auth={auth}>
                  <NewRoom />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/users"
              element={
                <RequiredAuth auth={auth}>
                  <Users />
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/users/:id"
              element={
                <RequiredAuth auth={auth}>
                  <UserDetail />
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/users/create"
              element={
                <RequiredAuth auth={auth}>
                  <NewUser />
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/users/update/:id"
              element={
                <RequiredAuth auth={auth}>
                  <NewUser />
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/contact"
              element={
                <RequiredAuth auth={auth}>
                  <Contact />
                </RequiredAuth>
              }
            />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
