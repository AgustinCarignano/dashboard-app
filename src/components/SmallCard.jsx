import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarCheck,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
const MyCard = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 16px 30px #00000014;
    & .icon {
      background-color: #e23428;
      color: #ffffff;
    }
  }
  .icon {
    background-color: #ffedec;
    color: #e23428;
    padding: 20px;
    border-radius: 8px;
    transition: all 0.3s;
  }
`;
const CardNumber = styled.p`
  font: normal 600 30px/46px "Poppins", sans-serif;
  color: #393939;
  margin: 0;
`;
const CardLegend = styled.p`
  font: normal 300 14px/21px "Poppins", sans-serif;
  color: #787878;
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

  return (
    <MyCard active={active}>
      <FontAwesomeIcon
        icon={cardsTypes[type].icon}
        size="lg"
        className="icon"
        rotation={type === "checkOut" ? 180 : 0}
      />
      <div>
        <CardNumber>{number}</CardNumber>
        <CardLegend>{cardsTypes[type].legend}</CardLegend>
      </div>
    </MyCard>
  );
}

export default SmallCard;
