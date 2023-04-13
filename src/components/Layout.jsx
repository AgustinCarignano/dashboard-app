import { useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../context/ThemeContext";

const GeneralLayout = styled.div`
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

export default function Layout({ children, showAside }) {
  const { theme } = useContext(themeContext);
  return (
    <GeneralLayout showAside={showAside} theme={theme}>
      {children}
    </GeneralLayout>
  );
}
