import React from "react";
import { useParams } from "react-router-dom";
import Aside from "../sharedComponents/Aside";
import Header from "../sharedComponents/Header";
import Layout from "../sharedComponents/Layout";
import MainContainer from "../sharedComponents/MainContainer";

function Bookings() {
  const { id } = useParams();
  return (
    <Layout>
      <Header title="Bookings" />
      <Aside activeLink="bookings" />
      <MainContainer></MainContainer>
    </Layout>
  );
}

export default Bookings;
