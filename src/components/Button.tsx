import React from "react";
import styled from "styled-components";
import { useContext } from "react";
//import { themeContext } from "../context/ThemeContext";
import { themeContext } from "../context/ThemeContext";

type propsType = {
  background: string;
  border: string;
};

export const MyButton = styled.button<propsType>`
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  border: ${(props) => props.border};
  font: normal 600 14px/21px "Poppins", sans-serif;
  text-align: center;
  padding: 13px 35px;
  border-radius: 12px;
  cursor: ${(props) => (props.onClick ? "Pointer" : "normal")};
`;

interface ButtonProps {
  variant: number;
  children: any;
  onClick?: (e: React.BaseSyntheticEvent) => void; //probar de cambiar el return implicito en arrow functions
  value?: string | number | readonly string[];
  name?: string;
  style?: React.CSSProperties;
}

export default function Button({
  variant,
  children,
  onClick,
  value,
  name,
}: ButtonProps) {
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
      color: theme[30],
      border: `solid 1px ${theme[30]}`,
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
      {...variantsOption[variant as keyof typeof variantsOption]}
    >
      {children}
    </MyButton>
  );
}
