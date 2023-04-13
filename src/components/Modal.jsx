import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
  /* background-color: #1111111a; */
`;

export const ModalWindow = styled.div`
  text-align: center;
  position: fixed;
  background-color: ${(props) => props.theme[1]};
  /* background-color: #fff; */
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
    /* color: #212121; */
    margin-bottom: 20px;
  }
  p {
    font: normal 400 20px/30px Poppins, Sans-serif;
    color: ${(props) => props.theme[9]};
    /* color: #6e6e6e; */
    text-align: justify;
    margin-bottom: 50px;
  }
  svg {
    margin-left: 97.5%;
    cursor: pointer;
    color: ${(props) => props.theme[19]};
  }
`;

function Modal(props) {
  const [openModal, setOpenModal] = useState(false);
  const { theme } = useContext(themeContext);
  const { preview, title, content, previewStyle, changeToOpen } = props;

  function handleOpenMessage() {
    setOpenModal(true);
    changeToOpen && changeToOpen();
  }

  return (
    <div>
      <p style={previewStyle} onClick={content ? handleOpenMessage : null}>
        {preview}
      </p>
      {openModal && (
        <ModalContainer
          id="closeWindow"
          theme={theme}
          onClick={(e) => {
            e.target.id.includes("closeWindow") && setOpenModal(false);
          }}
          /* onClick={(e) => {
            !e.target.id.includes("modalWindow") && setOpenModal(false);
          }} */
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
