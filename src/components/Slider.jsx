import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { themeContext } from "../context/ThemeContext";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  img {
    width: 100%;
    aspect-ratio: 4/3;
  }
`;

const ControlContainer = styled.div`
  background-color: ${(props) => props.theme[3]};
  width: 50px;
  height: 50px;
  padding: 15px;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: ${(props) => (props.type === "next" ? "auto" : "40px")};
  right: ${(props) => (props.type === "next" ? "40px" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme[27]};
  cursor: pointer;
`;

function Slider({ photos }) {
  const [index, setIndex] = useState(0);
  const { theme } = useContext(themeContext);

  function showNextPhoto() {
    if (index === photos.length - 1) setIndex(0);
    else setIndex((prev) => prev + 1);
  }
  function showPrevPhoto() {
    if (index === 0) setIndex(photos.length - 1);
    else setIndex((prev) => prev - 1);
  }

  return (
    <SliderContainer>
      <img src={photos[index]} alt="hotel room" />
      <ControlContainer type="prev" theme={theme} onClick={showPrevPhoto}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </ControlContainer>
      <ControlContainer type="next" theme={theme} onClick={showNextPhoto}>
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </ControlContainer>
    </SliderContainer>
  );
}

export default Slider;
