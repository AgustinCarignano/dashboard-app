import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../context/ThemeContext";

const GeneralLayout = styled.div<{showAside:boolean}>`
  background-color: ${(props) => props.theme[2]};
  display: grid;
  grid-template-areas:
    "aside header"
    "aside main";
  grid-template-columns: ${(props) =>
    props.showAside ? "1fr 4fr" : "0px 4fr"};
  grid-template-rows: 145px 1fr;
  align-items: start;
`;

type PropsType = {
  children:React.ReactElement,
  showAside:boolean,
}

export default function Layout({ children, showAside }:PropsType) {
  const { theme } = useContext(themeContext);
  return (
    <GeneralLayout showAside={showAside} theme={theme}>
      {children}
    </GeneralLayout>
  );
}
