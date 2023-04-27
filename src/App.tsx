import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
              <>
                <Aside sidebarVisibility={showSidebar} />
                <Header handleSidebarVisibility={handleSidebarVisibility} />

                <Routes>
                  <Route path="/dashboard-app/login" element={<Login />} />
                  <Route
                    path="/dashboard-app/"
                    element={<Navigate to="/dashboard-app/dashboard" />}
                  />
                  <Route
                    path="/dashboard-app/dashboard"
                    element={
                      <RequiredAuth>
                        <Dashboard />
                      </RequiredAuth>
                    }
                  />
                  <Route
                    path="/dashboard-app/bookings"
                    element={
                      <RequiredAuth>
                        <Bookings />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/bookings/:id"
                    element={
                      <RequiredAuth>
                        <BookingDetail />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/bookings/create"
                    element={
                      <RequiredAuth>
                        <NewBooking />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/bookings/update/:id"
                    element={
                      <RequiredAuth>
                        <UpdateBooking />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/rooms"
                    element={
                      <RequiredAuth>
                        <Rooms />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/rooms/:id"
                    element={
                      <RequiredAuth>
                        <RoomDetail />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/rooms/create"
                    element={
                      <RequiredAuth>
                        <NewRoom />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/rooms/update/:id"
                    element={
                      <RequiredAuth>
                        <UpdateRoom />
                      </RequiredAuth>
                    }
                  ></Route>
                  <Route
                    path="/dashboard-app/users"
                    element={
                      <RequiredAuth>
                        <Users />
                      </RequiredAuth>
                    }
                  />
                  <Route
                    path="/dashboard-app/users/:id"
                    element={
                      <RequiredAuth>
                        <UserDetail />
                      </RequiredAuth>
                    }
                  />
                  <Route
                    path="/dashboard-app/users/create"
                    element={
                      <RequiredAuth>
                        <NewUser />
                      </RequiredAuth>
                    }
                  />
                  <Route
                    path="/dashboard-app/users/update/:id"
                    element={
                      <RequiredAuth>
                        <UpdateUser />
                      </RequiredAuth>
                    }
                  />
                  <Route
                    path="/dashboard-app/contact"
                    element={
                      <RequiredAuth>
                        <Contact />
                      </RequiredAuth>
                    }
                  />
                  <Route path="*" element={<InvalidPage />} />
                </Routes>
              </>
            </Layout>
          </div>
        </BrowserRouter>
      </LoginContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
