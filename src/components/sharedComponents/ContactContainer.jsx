import styled from "styled-components";

const ContactContainer = styled.div`
  grid-column: 1/5;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  padding: 30px;
  .title {
    font: normal 400 20px/30px "Poppins", sans-serif;
    color: #393939;
    margin: 0;
  }
  .cards {
    display: flex;
    margin: 30px 0;
    gap: 40px;
  }
`;

export default ContactContainer;
