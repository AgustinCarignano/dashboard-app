import React from "react";
import styled from "styled-components";

const colorOptions = {
  1: {
    background: "#135846",
    color: "#FFF",
  },
  2: {
    background: "#EBF1EF",
    color: "#135846",
  },
};

const Button = styled.button`
  color: ${(props) => colorOptions[props.variant].color};
  background-color: ${(props) => colorOptions[props.variant].background};
  font: normal 600 14px/21px "Poppins", sans-serif;
  text-align: center;
  padding: 13px 35px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;
/* function Button(props) {
  console.log(props.color);

  return <MyBtn color="white">{props.children}</MyBtn>;
} */

//export default Button;
export default Button;
