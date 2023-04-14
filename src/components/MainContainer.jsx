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
`;

export default function MainContainer({ children }) {
  const theme = useContext(themeContext);
  return <MyMain {...theme}>{children}</MyMain>;
}
