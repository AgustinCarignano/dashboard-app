import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faEnvelope,
  faBell,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { getAllData } from "../mockService/service";

const StyleHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 40px 50px;
  min-height: 145px;
  box-shadow: 0px 3px 10px #00000005;
`;

const Title = styled.h1`
  font: normal 600 28px "Poppins", sans-serif;
  color: #262626;
  margin: 0;
`;

const Breadcrumb = styled.p`
  font: normal 400 14px/21px "Poppins", sans-serif;
  /* color: #135846;
  span {
    color: #6e6e6e;
  } */
`;
const BreadcrumbLink = styled.span`
  color: ${(props) => (props.onClick ? "#135846" : "#6e6e6e")};
  cursor: ${(props) => (props.onClick ? "Pointer" : "auto")};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const IconContainer = styled.div`
  color: #135846;
  position: relative;
  cursor: pointer;
  span {
    background-color: #e23428;
    border-radius: 8px;
    color: #ffffff;
    font-size: 14px;
    width: 30px;
    padding: 6px 0;
    text-align: center;
    position: absolute;
    top: -70%;
    right: -100%;
  }
`;

function Header(props) {
  const { handleSidebarVisibility, handleCheckOut, auth } = props;
  const [breadcrumb, setBreadcrumb] = useState("");
  const [pathArray, setPathArray] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(5);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const TitleList = {
    "": "Dashboard",
    bookings: "Bookings",
    rooms: "Rooms",
    contact: "Contact",
    users: "Users",
    login: "Login",
  };

  function handleNavigate() {
    const path = `/dashboard-app/${pathArray[2]}/`;
    navigate(path);
  }

  async function getBookingsData() {
    const data = await getAllData("bookings_data.json");
    const filterData = data.filter(
      (item) => new Date(item.orderDate).getMonth() === new Date().getMonth()
    );
    setNotifications(filterData.length);
  }

  async function getContactData() {
    const data = await getAllData("contact_data.json");
    const filterData = data.filter((item) => item.archived === false);
    setMessages(filterData.length);
  }

  useEffect(() => {
    const array = pathname.split("/");
    if (array[3]) {
      if (array[3] === "create") {
        setBreadcrumb(`New ${TitleList[array[2]]}`);
      } else if (array[3] === "update") {
        setBreadcrumb(`Update ${TitleList[array[2]]} / ${array[4]}`);
      } else {
        setBreadcrumb(array[3]);
      }
    } else {
      setBreadcrumb("");
    }
    setPathArray(array);
  }, [pathname]);

  useEffect(() => {
    if (!auth) return;
    getBookingsData();
    getContactData();
  }, []);

  return (
    <StyleHeader>
      <Container>
        <IconContainer>
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            size="lg"
            onClick={handleSidebarVisibility}
            style={{ cursor: "Pointer" }}
          />
        </IconContainer>
        <TitleContainer>
          <Title>{TitleList[pathArray[2]] || "Dashboard"}</Title>
          {breadcrumb && (
            <Breadcrumb>
              <BreadcrumbLink onClick={handleNavigate}>
                {TitleList[pathArray[2]]} /
              </BreadcrumbLink>
              <BreadcrumbLink> {breadcrumb}</BreadcrumbLink>
              {/* {TitleList[pathArray[2]]} / <span>{breadcrumb}</span> */}
            </Breadcrumb>
          )}
        </TitleContainer>
      </Container>
      {auth && (
        <Container>
          <IconContainer>
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            {messages !== 0 && <span>{messages}</span>}
          </IconContainer>
          <IconContainer>
            <FontAwesomeIcon icon={faBell} size="lg" />
            {notifications !== 0 && <span>{notifications}</span>}
          </IconContainer>
          <IconContainer>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="lg"
              onClick={handleCheckOut}
            />
          </IconContainer>
        </Container>
      )}
    </StyleHeader>
  );
}

export default Header;
