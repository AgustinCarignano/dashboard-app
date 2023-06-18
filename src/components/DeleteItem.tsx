import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalContainer, ModalWindow } from "./Modal";
import Button from "./Button";
import { themeContext } from "../context/ThemeContext";

const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

type PropsType = {
  handleClose: () => void;
  handleDelete: () => void;
};

function DeleteItem({ handleClose, handleDelete }: PropsType) {
  const { theme } = useContext(themeContext);
  return (
    <ModalContainer theme={theme}>
      <ModalWindow id="modalDeleteWindow" theme={theme}>
        <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleClose} />
        <h3>Do you really want to delete this item?</h3>
        <BtnContainer>
          <Button variant={2} onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant={2} onClick={handleDelete}>
            CONFIRM
          </Button>
        </BtnContainer>
      </ModalWindow>
    </ModalContainer>
  );
}

export default DeleteItem;
