import React, { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { ModalContainer, ModalWindow } from "./Modal";
import Button from "./Button";

type PropsType = {
  toggleVisibility: ()=>void,
  message: string,
  dataCy:string,
  textBtn:string
}

function ErrorAlert({ toggleVisibility, message, dataCy, textBtn }:PropsType) {
  const { theme } = useContext(themeContext);
  return (
    <ModalContainer
      id="closeWindow"
      theme={theme}
      onClick={(e) => {
        e.target instanceof Element && e.target.id.includes("closeWindow") && toggleVisibility();
      }}
    >
      <ModalWindow id="modalWindow" theme={theme}>
        <h3 data-cy={dataCy}>{message}</h3>
        <Button variant={2} onClick={toggleVisibility}>
          {textBtn}
        </Button>
      </ModalWindow>
    </ModalContainer>
  );
}

export default ErrorAlert;
