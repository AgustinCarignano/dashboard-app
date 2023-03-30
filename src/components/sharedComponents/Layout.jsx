import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "aside header"
    "aside main";
  grid-template-columns: ${(props) =>
    props.showAside ? "1fr 4fr" : "0px 4fr"};
  grid-template-rows: 120px 1fr;
  align-items: start;
`;

export default Layout;
