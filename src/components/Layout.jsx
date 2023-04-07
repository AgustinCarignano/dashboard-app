import styled from "styled-components";

const Layout = styled.div`
  background-color: #f8f8f8;
  display: grid;
  grid-template-areas:
    "aside header"
    "aside main";
  grid-template-columns: ${(props) =>
    props.showAside ? "1fr 4fr" : "0px 4fr"};
  grid-template-rows: 145px 1fr;
  align-items: start;
`;

export default Layout;
