import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "aside header"
    "aside main";
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 120px 1fr;
  align-items: start;
`;

export default Layout;
