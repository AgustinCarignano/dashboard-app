import { DotWave } from "@uiball/loaders";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  right: 50%;
  margin: 0 auto;
`;

export default function Loader() {
  return (
    <Container>
      <DotWave size={47} speed={1} color="#135846" />
    </Container>
  );
}
