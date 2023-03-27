import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faEnvelope,
  faBell,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const StyleHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 40px 50px;
  box-shadow: 0px 3px 10px #00000005;
`;

const Title = styled.h1`
  font: normal 600 28px "Poppins", sans-serif;
  color: #262626;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const IconContainer = styled.div`
  color: #135846;
  position: relative;
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
  const messages = 2;
  const notifications = 87;
  return (
    <StyleHeader>
      <Container>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} size="lg" />
        <Title>{props.title}</Title>
      </Container>
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
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
        </IconContainer>
      </Container>
    </StyleHeader>
  );
}

export default Header;
