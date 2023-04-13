import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarCheck,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { themeContext } from "../context/ThemeContext";

const MyCard = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  gap: 20px;
  background-color: ${(props) => props.theme[1]};
  /* background-color: #ffffff; */
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 16px 30px ${(props) => props.theme[18]};
    /* box-shadow: 0px 16px 30px #00000014; */
    & .icon {
      background-color: ${(props) => props.theme[11]};
      /* background-color: #e23428; */
      color: ${(props) => props.theme[25]};
      /* color: #ffffff; */
    }
  }
  .icon {
    background-color: ${(props) => props.theme[10]};
    /* background-color: #ffedec; */
    color: ${(props) => props.theme[11]};
    /* color: #e23428; */
    padding: 20px;
    border-radius: 8px;
    transition: all 0.3s;
  }
`;
const CardNumber = styled.p`
  font: normal 600 30px/46px "Poppins", sans-serif;
  color: ${(props) => props.theme[17]};
  /* color: #393939; */
  margin: 0;
`;
const CardLegend = styled.p`
  font: normal 300 14px/21px "Poppins", sans-serif;
  color: ${(props) => props.theme[13]};
  /* color: #787878; */
  margin: 0;
`;
const cardsTypes = {
  newBooking: {
    icon: faBed,
    legend: "Total Bookings",
  },
  schedule: {
    icon: faCalendarCheck,
    legend: "Ocupation Rate",
  },
  checkIn: {
    icon: faArrowRightToBracket,
    legend: "Check In",
  },
  checkOut: {
    icon: faArrowRightToBracket,
    legend: "Check Out",
  },
};

function SmallCard(props) {
  const { type, number, active } = props;
  const { theme } = useContext(themeContext);

  return (
    <MyCard active={active} theme={theme}>
      <FontAwesomeIcon
        icon={cardsTypes[type].icon}
        size="lg"
        className="icon"
        rotation={type === "checkOut" ? 180 : 0}
      />
      <div>
        <CardNumber theme={theme}>{number}</CardNumber>
        <CardLegend theme={theme}>{cardsTypes[type].legend}</CardLegend>
      </div>
    </MyCard>
  );
}

export default SmallCard;
