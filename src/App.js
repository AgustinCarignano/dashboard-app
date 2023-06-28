import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
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
import LoginContextProvider from "./context/LoginContext";
import ThemeContextProvider from "./context/ThemeContext";
import UpdateBooking from "./pages/bookings/UpdateBooking";
import UpdateRoom from "./pages/rooms/UpdateRoom";
import UpdateUser from "./pages/users/UpdateUser";
import InvalidPage from "./pages/invalidPage/InvalidPage";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  function handleSidebarVisibility() {
    setShowSidebar(!showSidebar);
  }

  return (
    <ThemeContextProvider>
      <LoginContextProvider>
        <BrowserRouter>
          <div className="App">
            <Layout showAside={showSidebar}>
              <Aside sidebarVisibility={showSidebar} />
              <Header handleSidebarVisibility={handleSidebarVisibility} />

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                  path="/dashboard"
                  element={
                    <RequiredAuth>
                      <Dashboard />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <RequiredAuth>
                      <Bookings />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/bookings/:id"
                  element={
                    <RequiredAuth>
                      <BookingDetail />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/bookings/create"
                  element={
                    <RequiredAuth>
                      <NewBooking />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/bookings/update/:id"
                  element={
                    <RequiredAuth>
                      <UpdateBooking />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/rooms"
                  element={
                    <RequiredAuth>
                      <Rooms />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/rooms/:id"
                  element={
                    <RequiredAuth>
                      <RoomDetail />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/rooms/create"
                  element={
                    <RequiredAuth>
                      <NewRoom />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/rooms/update/:id"
                  element={
                    <RequiredAuth>
                      <UpdateRoom />
                    </RequiredAuth>
                  }
                ></Route>
                <Route
                  path="/users"
                  element={
                    <RequiredAuth>
                      <Users />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/users/:id"
                  element={
                    <RequiredAuth>
                      <UserDetail />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/users/create"
                  element={
                    <RequiredAuth>
                      <NewUser />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/users/update/:id"
                  element={
                    <RequiredAuth>
                      <UpdateUser />
                    </RequiredAuth>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <RequiredAuth>
                      <Contact />
                    </RequiredAuth>
                  }
                />
                <Route path="*" element={<InvalidPage />} />
              </Routes>
            </Layout>
          </div>
        </BrowserRouter>
      </LoginContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
