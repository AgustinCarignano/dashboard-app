import styled from "styled-components";
import { ModalContainer, ModalWindow } from "./Modal";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

function DeleteItem({ handleClose, handleDelete }) {
  return (
    <ModalContainer>
      <ModalWindow id="modalDeleteWindow">
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
