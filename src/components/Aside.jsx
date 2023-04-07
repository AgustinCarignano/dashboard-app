import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getItemData } from "../mockService/service";
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

const StyledAside = styled.aside`
  grid-area: aside;
  padding-top: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  box-shadow: 13px 3px 40px #00000005;
  transform: translateX(${(props) => (props.show ? "0px" : "-400px")});
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 25px;
  padding: 10px 56px;
  width: 100%;
  align-items: center;
  font: normal ${(props) => (props.active ? "600" : "400")} 18px/27px Poppins,
    sans-serif;
  color: ${(props) => (props.active ? "#e23428" : "#799283")};
  border-left: ${(props) =>
    props.active ? "solid 5px #e23428" : "solid 5px #fff"};
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
  const { sidebarVisibility, auth, loggedUser } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathArray = pathname.split("/");

  function handleNavigate() {
    const path = `/dashboard-app/users/update/${loggedUser.id}`;
    navigate(path);
  }

  return (
    <StyledAside show={sidebarVisibility}>
      <Logo>
        <img src="https://i.imgur.com/WlUcHWA.png" alt="logo" />
      </Logo>
      {!auth ? (
        <LinkContainer active={true} style={{ marginBottom: "100%" }}>
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          <Link to="dashboard-app/login">
            <p>Login</p>
          </Link>
        </LinkContainer>
      ) : (
        <>
          <LinkContainer active={pathArray[2] === ""}>
            <FontAwesomeIcon icon={faTableColumns} />
            <Link to="dashboard-app/">
              <p>Dashboard</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "bookings"}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            <Link to="dashboard-app/bookings">
              <p>Bookings</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "rooms"}>
            <FontAwesomeIcon icon={faKey} />
            <Link to="dashboard-app/rooms">
              <p>Rooms</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "contact"}>
            <FontAwesomeIcon icon={faMessage} />
            <Link to="dashboard-app/contact">
              <p>Contact</p>
            </Link>
          </LinkContainer>
          <LinkContainer active={pathArray[2] === "users"}>
            <FontAwesomeIcon icon={faUser} />
            <Link to="dashboard-app/users">
              <p>Users</p>
            </Link>
          </LinkContainer>
          <UserCard>
            <img src={loggedUser.photo} alt="" />
            <h3>{loggedUser.fullName}</h3>
            <p>{loggedUser.email}</p>
            <Button variant={2} onClick={handleNavigate}>
              Edit
            </Button>
          </UserCard>
        </>
      )}
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
