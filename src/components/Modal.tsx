import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { themeContext } from "../context/ThemeContext";

export const ModalContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: ${(props) => props.theme[26]};
`;

export const ModalWindow = styled.div`
  text-align: center;
  position: fixed;
  background-color: ${(props) => props.theme[1]};
  width: 80%;
  max-width: 450px;
  top: 20vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  h3 {
    text-align: center;
    font: normal 600 30px/46px Poppins, Sans-serif;
    color: ${(props) => props.theme[19]};
    margin-bottom: 20px;
  }
  p {
    font: normal 400 20px/30px Poppins, Sans-serif;
    color: ${(props) => props.theme[9]};
    text-align: justify;
    margin-bottom: 50px;
  }
  svg {
    margin-left: 97.5%;
    cursor: pointer;
    color: ${(props) => props.theme[19]};
  }
`;

type PropsType = {
  preview: string | React.ReactElement;
  title: string;
  content: string;
  previewStyle?: React.CSSProperties;
  changeToOpen?: undefined | (() => void);
};

function Modal(props: PropsType) {
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useContext(themeContext);
  const { preview, title, content, previewStyle, changeToOpen } = props;

  function handleOpenMessage() {
    setOpenModal(true);
    changeToOpen && changeToOpen();
  }

  return (
    <div>
      <p style={previewStyle} onClick={content ? handleOpenMessage : undefined}>
        {preview}
      </p>
      {openModal && (
        <ModalContainer
          id="closeWindow"
          theme={theme}
          onClick={(e) => {
            e.target instanceof Element &&
              e.target.id.includes("closeWindow") &&
              setOpenModal(false);
          }}
        >
          <ModalWindow id="modalWindow" theme={theme}>
            <FontAwesomeIcon
              icon={faXmark}
              size="lg"
              onClick={() => setOpenModal(false)}
            />
            <h3>{title}</h3>
            <p>{content}</p>
            <Button variant={2} onClick={() => setOpenModal(false)}>
              OK
            </Button>
          </ModalWindow>
        </ModalContainer>
      )}
    </div>
  );
}

export default Modal;
