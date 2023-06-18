import React from "react";
import styled from "styled-components";
//import { DotWave } from "@uiball/loaders";
const { DotWave } = require("@uiball/loaders");

const Container = styled.div`
  position: absolute;
  top: 20%;
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
