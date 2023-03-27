import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faCalendarCheck,
  faKey,
  faMessage,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const StyledAside = styled.aside`
  grid-area: aside;
  padding: 32px 56px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 55px;
  box-shadow: 13px 3px 40px #00000005;
  min-height: 100vh;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
  font: normal ${(props) => (props.active ? "600" : "400")} 18px/27px Poppins,
    sans-serif;
  color: ${(props) => (props.active ? "#e23428" : "#799283")};
  p {
    transition: transform 0.3s;
  }
  p:hover {
    transform: scale(1.1);
  }
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 24px;
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  margin: 60px 0;
  img {
    width: 30%;
    aspect-ratio: 1/1;
    margin: -25% auto 0;
    border-radius: 8px;
  }
  h3 {
    font: normal 400 16px/25px Poppins, sans-serif;
    color: #393939;
    margin: 15px auto 10px;
  }
  p {
    font: normal 300 12px/18px Poppins, sans-serif;
    color: #b2b2b2;
    margin-bottom: 15px;
  }
`;

const Credits = styled.div`
  h3 {
    font: normal 600 16px/25px Poppins, sans-serif;
    color: #212121;
    margin: 0;
  }
  p {
    font: normal 300 14px/21px Poppins, sans-serif;
    color: #799283;
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
  return (
    <StyledAside>
      <Logo>
        <img src="https://i.imgur.com/WlUcHWA.png" alt="logo" />
      </Logo>
      <LinkContainer active={props.activeLink === "dashboard"}>
        <FontAwesomeIcon icon={faTableColumns} />
        <Link to="/">
          <p>Dashboard</p>
        </Link>
      </LinkContainer>
      <LinkContainer active={props.activeLink === "bookings"}>
        <FontAwesomeIcon icon={faCalendarCheck} />
        <Link to="/bookings">
          <p>Booking</p>
        </Link>
      </LinkContainer>
      <LinkContainer active={props.activeLink === "rooms"}>
        <FontAwesomeIcon icon={faKey} />
        <Link to="/rooms">
          <p>Rooms</p>
        </Link>
      </LinkContainer>
      <LinkContainer active={props.activeLink === "contact"}>
        <FontAwesomeIcon icon={faMessage} />
        <Link to="/contact">
          <p>Contact</p>
        </Link>
      </LinkContainer>
      <LinkContainer active={props.activeLink === "users"}>
        <FontAwesomeIcon icon={faUser} />
        <Link to="users">
          <p>Users</p>
        </Link>
      </LinkContainer>
      <UserCard>
        <img src="https://i.imgur.com/wcT5ydV.jpg" alt="" />
        <h3>Jane Doe</h3>
        <p>janedoe@mail.com</p>
        <Button variant={2}>Edit</Button>
      </UserCard>
      <Credits>
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
