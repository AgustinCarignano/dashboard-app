import React from "react";
import styled from "styled-components";

const colorOptions = {
  1: {
    background: "#135846",
    color: "#FFF",
    border: "solid 1px #135846",
  },
  2: {
    background: "#EBF1EF",
    color: "#135846",
    border: "solid 1px #EBF1EF",
  },
  3: {
    background: "#EEF9F2",
    color: "#212121",
    border: "solid 1px #EEF9F2",
  },
  4: {
    background: "#fff",
    color: "#799283",
    border: "solid 1px #799283",
  },
  5: {
    background: "#FFFFFF",
    color: "#135846",
    border: "solid 1px #135846",
  },
  6: {
    background: "#5AD07A",
    color: "#FFFFFF",
    border: "solid 1px #5AD07A",
  },
  7: {
    background: "#E23428",
    color: "#FFFFFF",
    border: "solid 1px #E23428",
  },
  8: {
    background: "#FF9C3A",
    color: "#FFFFFF",
    border: "solid 1px #FF9C3A",
  },
};

const Button = styled.button`
  color: ${(props) => colorOptions[props.variant].color};
  background-color: ${(props) => colorOptions[props.variant].background};
  border: ${(props) => colorOptions[props.variant].border};
  font: normal 600 14px/21px "Poppins", sans-serif;
  text-align: center;
  padding: 13px 35px;
  border-radius: 12px;
  cursor: pointer;
`;
/* function Button(props) {
  console.log(props.color);

  return <MyBtn color="white">{props.children}</MyBtn>;
} */

//export default Button;
export default Button;
