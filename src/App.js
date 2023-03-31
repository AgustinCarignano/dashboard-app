import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./components/bookings/Bookings";
import BookingsItem from "./components/bookings/BookingsItem";
import Contact from "./components/contact/Contact";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import NewRoom from "./components/rooms/NewRoom";
import Rooms from "./components/rooms/Rooms";
import Aside from "./components/sharedComponents/Aside";
import Header from "./components/sharedComponents/Header";
import Layout from "./components/sharedComponents/Layout";
import RequiredAuth from "./components/sharedComponents/RequiredAuth";
import NewUser from "./components/users/NewUser";
import UpdateUser from "./components/users/UpdateUser";
import Users from "./components/users/Users";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth"));
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
    } else {
      localStorage.removeItem("auth");
    }
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Layout showAside={showSidebar}>
          <Aside sidebarVisibility={showSidebar} auth={auth} />
          <Header
            handleSidebarVisibility={handleSidebarVisibility}
            handleCheckOut={handleCheckOut}
            auth={auth}
          />

          <Routes>
            <Route
              path="/dashboard-app/login"
              element={<Login auth={auth} setAuth={setAuth} />}
            />
            <Route
              path="/dashboard-app/"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Dashboard />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/bookings"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Bookings />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/bookings/:id"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <BookingsItem />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Rooms />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms/:id"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Rooms />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms/create"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <NewRoom />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/rooms/update/:id"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Rooms />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/dashboard-app/users"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Users />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/users/:id"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Users />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/users/create"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <NewUser />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/users/update/:id"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <UpdateUser />
                  {/* </Layout> */}
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard-app/contact"
              element={
                <RequiredAuth auth={auth}>
                  {/* <Layout showAside={showSidebar}> */}
                  {/* <Aside sidebarVisibility={showSidebar} /> */}
                  {/* <Header handleSidebarVisibility={handleSidebarVisibility} /> */}
                  <Contact />
                  {/* </Layout> */}
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
