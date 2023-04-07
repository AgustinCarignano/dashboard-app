import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  img {
    width: 100%;
    aspect-ratio: 4/3;
  }
`;

const ControlContainer = styled.div`
  background-color: #fff;
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
  color: #135846;
  cursor: pointer;
`;

function Slider({ photos }) {
  const [index, setIndex] = useState(0);

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
      <img src={photos[index]} />
      <ControlContainer type="prev" onClick={showPrevPhoto}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </ControlContainer>
      <ControlContainer type="next" onClick={showNextPhoto}>
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </ControlContainer>
    </SliderContainer>
  );
}

export default Slider;
