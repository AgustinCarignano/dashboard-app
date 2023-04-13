import styled from "styled-components";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

const MyButton = styled.button`
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  border: ${(props) => props.border};
  font: normal 600 14px/21px "Poppins", sans-serif;
  text-align: center;
  padding: 13px 35px;
  border-radius: 12px;
  cursor: pointer;
`;
/* const MyButton = styled.button`
  color: ${(props) => variantsOption[props.variant].color};
  background-color: ${(props) => variantsOption[props.variant].background};
  border: ${(props) => variantsOption[props.variant].border};
  font: normal 600 14px/21px "Poppins", sans-serif;
  text-align: center;
  padding: 13px 35px;
  border-radius: 12px;
  cursor: pointer;
`; */

export default function Button({ variant, children, onClick, value, name }) {
  const { theme } = useContext(themeContext);

  const variantsOption = {
    1: {
      background: theme[15],
      color: theme[25],
      border: `solid 1px ${theme[15]}`,
    },
    2: {
      background: theme[3],
      color: theme[27],
      border: `solid 1px ${theme[3]}`,
    },
    3: {
      background: theme[5],
      color: theme[19],
      border: `solid 1px ${theme[5]}`,
    },
    4: {
      background: "transparent",
      color: theme[12],
      border: `solid 1px ${theme[12]}`,
    },
    5: {
      background: theme[1],
      color: theme[15],
      border: `solid 1px ${theme[15]}`,
    },
    6: {
      background: theme[14],
      color: theme[25],
      border: `solid 1px ${theme[14]}`,
    },
    7: {
      background: theme[11],
      color: theme[25],
      border: `solid 1px ${theme[11]}`,
    },
    8: {
      background: theme[16],
      color: theme[25],
      border: `solid 1px ${theme[16]}`,
    },
    9: {
      background: "transparent",
      color: theme[14],
      border: `solid 1px transparent`,
    },
    10: {
      background: "transparent",
      color: theme[11],
      border: `solid 1px transparent`,
    },
  };

  return (
    <MyButton
      onClick={onClick}
      name={name}
      value={value}
      {...variantsOption[variant]}
    >
      {children}
    </MyButton>
  );
}
