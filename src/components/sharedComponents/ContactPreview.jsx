import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const CardsContainer = styled.div`
  grid-column: 1/5;
  background-color: ${(props) => props.bg_color};
  box-shadow: ${(props) => (props.shadow ? "0px 4px 4px #00000005" : "none")};
  border-radius: 20px;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
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
const MyCard = styled.div`
  background-color: #ffffff;
  padding: 30px;
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  transition: all 0.3s;
  :hover {
    box-shadow: 0px 16px 30px #00000014;
  }
  .field {
    font: normal 600 16px/25px "Poppins", sans-serif;
    color: #262626;
    margin: 5px 0;
  }
  .content {
    font: normal 400 16px/28px "Poppins", sans-serif;
    color: #4e4e4e;
  }
`;

const Field = styled.p`
  font: normal 600 16px/25px "Poppins", sans-serif;
  color: #262626;
  margin: 5px 0;
`;
const Content = styled.p`
  font: normal 400 16px/28px "Poppins", sans-serif;
  color: #4e4e4e;
`;

const ButtonContainer = styled.div`
  //grid-column: 3/4;
  width: 100%;
  display: flex;
  position: absolute;
  top: 13rem;
  justify-content: space-between;
  margin-left: auto;
  Button {
    padding: 13px 20px;
  }
`;

function ContactPreview(props) {
  const { data, bg_color, shadow } = props;
  const [dataToRender, setDataToRender] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  function handlePaginate(direction) {
    switch (direction) {
      case "next":
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        break;
      case "prev":
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (data.length > 3) {
      const slice = data.slice(
        3 * (currentPage - 1),
        3 * (currentPage - 1) + 3
      );
      setDataToRender(slice);
    } else {
      setDataToRender(data.slice(0, data.length));
    }
    setTotalPages(Math.ceil(data.length / 3));
  }, [data, currentPage]);

  return (
    <CardsContainer bg_color={bg_color} shadow={shadow}>
      {dataToRender.map((item, index) => {
        return (
          <MyCard key={index}>
            <Field>Name</Field>
            <Content>{item.fullName}</Content>
            <Field>Email</Field>
            <Content>{item.email}</Content>
            <Field>Phone</Field>
            <Content>{item.phone}</Content>
            <Field>Subject</Field>
            <Content>{item.subject}</Content>
            <Field>Message</Field>
            <Content>{item.message}</Content>
          </MyCard>
        );
      })}
      {/* <MyCard>
        <p className="field">Name</p>
        <p className="content">{name}</p>
        <p className="field">Email</p>
        <p className="content">{email}</p>
        <p className="field">Phone</p>
        <p className="content">{phone}</p>
        <p className="field">Subject</p>
        <p className="content">{subject}</p>
        <p className="field">Message</p>
        <p className="content">{message}</p>
      </MyCard> */}
      <ButtonContainer>
        <Button
          variant={4}
          available={currentPage > 1}
          onClick={() => handlePaginate("prev")}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </Button>
        <Button
          variant={4}
          available={currentPage < totalPages}
          onClick={() => handlePaginate("next")}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Button>
      </ButtonContainer>
    </CardsContainer>
  );
}

export default ContactPreview;
