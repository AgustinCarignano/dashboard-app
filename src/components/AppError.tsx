import { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { themeContext } from "../context/ThemeContext";

const Container = styled.div`
  grid-column: 2 / 4;
  text-align: center;
`;
const Title = styled.h1`
  text-align: center;
  font: normal 600 30px/46px Poppins, Sans-serif;
  color: ${(props) => props.theme[21]};
  margin-bottom: 20px;
`;

type propsType = {
  reload: () => void;
};

function AppError({ reload }: propsType) {
  const { theme } = useContext(themeContext);

  return (
    <Container>
      <Title theme={theme}>
        There has been an error while trying to get the data
      </Title>
      <Button variant={1} onClick={reload}>
        Try Again
      </Button>
    </Container>
  );
}

export default AppError;
