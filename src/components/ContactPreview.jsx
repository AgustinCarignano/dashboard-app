import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";
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
  padding-bottom: ${(props) => (props.extraPadding ? "70px" : "30px")};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 40px;
  position: relative;
`;
const Title = styled.h2`
  font: normal 400 20px/30px "Poppins", sans-serif;
  color: #393939;
  margin: 0 0 20px 0;
  grid-column: 1/4;
`;
const MyCard = styled.div`
  background-color: #ffffff;
  padding: 30px;
  min-height: 223px;
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
`;

const Name = styled.h3`
  font: normal 600 16px/25px "Poppins", sans-serif;
  color: #262626;
  margin: 0px 0;
`;
const Contact = styled.p`
  font: normal 400 12px/20px "Poppins", sans-serif;
  color: #6e6e6e;
  margin: 0;
`;
const Subject = styled(Contact)`
  font-size: 16px;
  margin: 5px 0px;
  padding-top: 5px;
  color: #4e4e4e;
  border-top: solid 1px #f5f5f5;
`;
const messageStyle = {
  font: "normal 400 14px/20px 'Poppins', sans-serif",
  color: "#6e6e6e",
  margin: "0",
  cursor: "pointer",
};

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: calc(50% - 24.3px);
  justify-content: space-between;
  margin-left: auto;
  Button {
    padding: 13px 20px;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

function ContactPreview(props) {
  const { title, data, bg_color, shadow } = props;
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
    <CardsContainer bg_color={bg_color} shadow={shadow} extraPadding={!!title}>
      {title && <Title>{title}</Title>}
      {dataToRender.map((item, index) => {
        return (
          <MyCard key={index}>
            <Name>{item.fullName}</Name>
            <Contact>
              {item.email} | {item.phone}
            </Contact>
            <Subject>{item.subject}</Subject>
            <Modal
              title={item.fullName}
              content={item.message}
              preview={
                item.message.length > 150
                  ? item.message.slice(0, 150) + "..."
                  : item.message
              }
              previewStyle={messageStyle}
            />
          </MyCard>
        );
      })}
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
