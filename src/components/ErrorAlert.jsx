import React, { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { ModalContainer, ModalWindow } from "./Modal";
import Button from "./Button";

function ErrorAlert({ toggleVisibity, message, dataCy, textBtn }) {
  const { theme } = useContext(themeContext);
  return (
    <ModalContainer
      id="closeWindow"
      theme={theme}
      onClick={(e) => {
        e.target.id.includes("closeWindow") && toggleVisibity();
      }}
    >
      <ModalWindow id="modalWindow" theme={theme}>
        <h3 data-cy={dataCy}>{message}</h3>
        <Button variant={2} onClick={toggleVisibity}>
          {textBtn}
        </Button>
      </ModalWindow>
    </ModalContainer>
  );
}

export default ErrorAlert;
