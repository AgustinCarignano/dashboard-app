import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapp = styled.div`
  position: relative;
`;

const Preview = styled.div`
  width: 10px;
  text-align: center;
  cursor: Pointer;
`;

const Container = styled.div`
  display: flex;
  width: 150px;
  border: 1px solid rgb(121, 146, 131);
  font: 600 16px/22px "Poppins", sans-serif;
  color: rgb(121, 146, 131);
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
  position: absolute;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  right: 10px;
  top: 20px;
  display: ${(props) => (props.visible ? "flex" : "none")};
`;

const Option = styled.p`
  cursor: Pointer;
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
      <Preview onClick={handleVisibility}>{preview}</Preview>
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
