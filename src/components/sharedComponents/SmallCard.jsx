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
  .icon {
    background-color: ${(props) => (props.active ? "#E23428" : "#FFEDEC")};
    color: ${(props) => (props.active ? "#FFFFFF" : "#E23428")};
    padding: 20px;
    border-radius: 8px;
  }
  .number {
    font: normal 600 30px/46px "Poppins", sans-serif;
    color: #393939;
    margin: 0;
  }
  .legend {
    font: normal 300 14px/21px "Poppins", sans-serif;
    color: #787878;
    margin: 0;
  }
`;
const cardsTypes = {
  newBooking: {
    icon: faBed,
    legend: "New Booking",
  },
  schedule: {
    icon: faCalendarCheck,
    legend: "Scheduled Room",
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
        <p className="number">{number}</p>
        <p className="legend">{cardsTypes[type].legend}</p>
      </div>
    </MyCard>
  );
}

export default SmallCard;
