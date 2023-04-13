import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { loginContext } from "../context/LoginContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faTableColumns,
  faCalendarCheck,
  faKey,
  faMessage,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { Input } from "./FormComponents";
import { themeContext } from "../context/ThemeContext";

const StyledAside = styled.aside`
  grid-area: aside;
  padding-top: 20px;
  /* background-color: #fff; */
  background-color: ${(props) => props.theme[1]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  height: 100%;
  z-index: 10;
  box-shadow: 13px 3px 40px ${(props) => props.theme[20]};
  transform: translateX(${(props) => (props.show ? "0px" : "-400px")});
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 25px;
  padding: 10px 56px;
  width: 100%;
  align-items: center;
  font: normal ${(props) => (props.active ? "600" : "400")} 18px/27px "Poppins",
    sans-serif;
  /* color: ${(props) => (props.active ? "#e23428" : "#799283")};
  border-left: ${(props) =>
    props.active ? "solid 5px #e23428" : "solid 5px #fff"}; */
  color: ${(props) => (props.active ? props.theme[11] : props.theme[12])};
  border-left: solid 5px
    ${(props) => (props.active ? props.theme[11] : props.theme[1])};
  p {
    transition: transform 0.3s;
  }
  p:hover {
    transform: scale(1.1);
  }
`;

const UserCard = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  text-align: center;
  padding: 24px;
  /* box-shadow: 0px 20px 30px #00000014; */
  box-shadow: 0px 20px 30px ${(props) => props.theme[18]};
  border-radius: 18px;
  margin: 60px 0;
  width: 60%;
  img {
    width: 40%;
    aspect-ratio: 1/1;
    margin: -25% auto 0;
    border-radius: 8px;
  }
  h3 {
    font: normal 400 16px/25px Poppins, sans-serif;
    color: #393939;
  }
  p {
    font: normal 300 12px/18px Poppins, sans-serif;
    color: #b2b2b2;
    margin-top: -5px;
  }
`;

const Credits = styled.div`
  margin-top: auto;
  h3 {
    font: normal 600 16px/25px Poppins, sans-serif;
    /* color: #212121; */
    color: ${(props) => props.theme[19]};
    margin: 0;
  }
  p {
    font: normal 300 14px/21px Poppins, sans-serif;
    /* color: #799283; */
    color: ${(props) => props.theme[12]};
    margin: 0 0 65px;
  }
`;

const Logo = styled.div`
  width: 80%;
  img {
    width: 100%;
  }
`;

function Aside(props) {
  const { sidebarVisibility } = props;
  const { state, dispatch } = useContext(loginContext);
  const [updating, setUpdating] = useState(false);
  const [userFullName, setUserFullName] = useState(state.fullName);
  const [userEmail, setUserEmail] = useState(state.email);
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const { theme } = useContext(themeContext);

  function handleUpdating() {
    setUpdating((prev) => !prev);
  }

  function handleEdit() {
    if (userFullName !== state.fullName || userEmail !== state.email) {
      dispatch({
        type: "updateUser",
        payload: { fullName: userFullName, email: userEmail },
      });
    }
    setUpdating((prev) => !prev);
  }

  return (
    <StyledAside show={sidebarVisibility} theme={theme}>
      <Logo>
        {theme[1] === "#ffffff" ? (
          <img src="https://i.imgur.com/WlUcHWA.png" alt="logo" />
        ) : (
          <img src="https://i.imgur.com/fj3gwNn.png" alt="logo" />
        )}
      </Logo>
      {!state.auth ? (
        <LinkContainer
          active={true}
          theme={theme}
          style={{ marginBottom: "100%" }}
        >
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          <Link to="dashboard-app/login">
            <p>Login</p>
          </Link>
        </LinkContainer>
      ) : (
        <>
          <LinkContainer active={pathArray[2] === ""} theme={theme}>
            <FontAwesomeIcon icon={faTableColumns} />
            <Link to="dashboard-app/">
              <p>Dashboard</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "bookings"} theme={theme}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            <Link to="dashboard-app/bookings">
              <p>Bookings</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "rooms"} theme={theme}>
            <FontAwesomeIcon icon={faKey} />
            <Link to="dashboard-app/rooms">
              <p>Rooms</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "contact"} theme={theme}>
            <FontAwesomeIcon icon={faMessage} />
            <Link to="dashboard-app/contact">
              <p>Contact</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "users"} theme={theme}>
            <FontAwesomeIcon icon={faUser} />
            <Link to="dashboard-app/users">
              <p>Users</p>
            </Link>
          </LinkContainer>
          <UserCard theme={theme}>
            <img src={state.photo} alt="" />
            {updating ? (
              <>
                <Input
                  style={{ width: "100%", fontSize: "14px" }}
                  value={userFullName}
                  onChange={(e) => setUserFullName(e.target.value)}
                />
                <Input
                  style={{ width: "100%", fontSize: "14px" }}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button variant={2} onClick={handleEdit}>
                  Acept
                </Button>
              </>
            ) : (
              <>
                <h3>{state.fullName}</h3>
                <p>{state.email}</p>
                <Button variant={2} onClick={handleUpdating}>
                  Edit
                </Button>
              </>
            )}
          </UserCard>
        </>
      )}
      <Credits theme={theme}>
        <h3>Travle Hotel Admin Dashboard</h3>
        <p>©2023 All Right Reserved</p>
        <p>
          Made with <FontAwesomeIcon icon={faHeart} /> by Agustin Carignano
        </p>
      </Credits>
    </StyledAside>
  );
}

export default Aside;
