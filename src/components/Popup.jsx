import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { themeContext } from "../context/ThemeContext";

const Wrapp = styled.div`
  position: relative;
  min-width: 10px;
`;

const Preview = styled.div`
  text-align: center;
  cursor: Pointer;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  z-index: 100;
  width: 100%;
  min-width: 130px;
  border: 1px solid ${(props) => props.theme[12]};
  font: 600 14px/20px "Poppins", sans-serif;
  color: ${(props) => props.theme[12]};
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  position: absolute;
  background-color: ${(props) => props.theme[1]};
  padding: 20px;
  border-radius: 10px;
  right: 0px;
  top: ${(props) => props.position};
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
  color: ${(props) => props.theme[15]};
  transition: transform 0.3s;
  transform: ${(props) => props.turnArrow && "rotate(180deg)"};
`;

const ExtraWindow = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0;
  left: 0;
`;

function Popup(props) {
  const [show, setShow] = useState(false);
  const { theme } = useContext(themeContext);
  const { preview, options, itemId, withArrow } = props;

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
        {preview}
        {withArrow && (
          <ArrowIcon turnArrow={show} theme={theme}>
            <FontAwesomeIcon icon={faChevronDown} size="lg" />
          </ArrowIcon>
        )}
      </Preview>
      <Container
        visible={show}
        theme={theme}
        position={withArrow ? "50px" : "30px"}
      >
        {options.map((item, index) => (
          <Option key={index} onClick={() => handleAction(item.action)}>
            {item.label}
          </Option>
        ))}
      </Container>
      {show && (
        <ExtraWindow
          id="closePopup"
          onClick={(e) =>
            e.target.id.includes("closePopup") && handleVisibility()
          }
        />
      )}
    </Wrapp>
  );
}

export default Popup;
