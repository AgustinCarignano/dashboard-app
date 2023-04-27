import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../context/ThemeContext";

const MyMain = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 50px;
  background-color: ${(props) => props.theme[2]};
  gap: 40px;
  position: relative;
  min-height: calc(100vh - 145px);
`;

export default function MainContainer(props: { children: React.ReactElement }) {
  const { theme } = useContext(themeContext);
  return <MyMain {...theme}>{props.children}</MyMain>;
}
