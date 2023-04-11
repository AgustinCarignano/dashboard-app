import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Wrapp = styled.div`
  width: 100%;
  position: relative;
`;

const Preview = styled.div`
  text-align: center;
  cursor: Pointer;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid rgb(121, 146, 131);
  font: 600 16px/22px "Poppins", sans-serif;
  color: rgb(121, 146, 131);
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  position: absolute;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  right: 0px;
  top: 50px;
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const Option = styled.p`
  cursor: Pointer;
  width: 100%;
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.15);
  }
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 13px;
  right: 10px;
  color: #135846;
  transition: transform 0.3s;
  transform: ${(props) => props.turnArrow && "rotate(180deg)"};
`;

function Popup(props) {
  const [show, setShow] = useState(false);
  const { preview, options, itemId } = props;

  function handleVisibility() {
    setShow((prev) => !prev);
  }

  function handleAction(action) {
    action(itemId);
    setShow((prev) => !prev);
  }

  return (
    <Wrapp>
      <Preview onClick={handleVisibility}>
        {preview}{" "}
        <ArrowIcon turnArrow={show}>
          <FontAwesomeIcon icon={faChevronDown} size="lg" />
        </ArrowIcon>
      </Preview>
      <Container visible={show}>
        {options.map((item, index) => (
          <Option key={index} onClick={() => handleAction(item.action)}>
            {item.label}
          </Option>
        ))}
      </Container>
    </Wrapp>
  );
}

export default Popup;
