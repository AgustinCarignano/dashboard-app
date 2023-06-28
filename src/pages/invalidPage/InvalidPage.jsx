import React, { useContext } from "react";
import MainContainer from "../../components/MainContainer";
import styled from "styled-components";
import { themeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Container = styled.div`
  grid-column: 1/5;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  min-height: calc(100vh - 345px);
  Button {
    cursor: pointer;
  }
`;

const Message = styled.h1`
  font: normal 600 28px "Poppins", sans-serif;
  color: ${(props) => props.theme[21]};
  margin: 0 auto;
`;

function InvalidPage() {
  const { theme } = useContext(themeContext);

  return (
    <MainContainer>
      <Container>
        <Message theme={theme}>404: The page doesn't exist</Message>
        <Link to="/dashboard">
          <Button variant={1}>Home</Button>
        </Link>
      </Container>
    </MainContainer>
  );
}

export default InvalidPage;
