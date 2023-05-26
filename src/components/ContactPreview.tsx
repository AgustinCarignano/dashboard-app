import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { themeContext } from "../context/ThemeContext";
import Button from "./Button";
import Modal from "./Modal";
import { updateContact } from "../store/slices/contactSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { ContactType } from "../@types/contacts";
import { useAppDispatch } from "../hooks/hooks";

const CardsContainer = styled.div<{ variant: number; extraPadding: boolean }>`
  grid-column: 1/5;
  background-color: ${(props) =>
    props.variant === 1 ? props.theme[1] : "none"};
  box-shadow: ${(props) =>
    props.variant === 1 ? `0px 4px 4px ${props.theme[20]}` : "none"};
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
  color: ${(props) => props.theme[17]};
  margin: 0 0 20px 0;
  grid-column: 1/4;
`;
const MyCard = styled.div`
  position: relative;
  background-color: ${(props) => props.theme[1]};
  padding: 30px;
  min-height: 223px;
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme[5]};
  border-radius: 20px;
  transition: all 0.3s;
  :hover {
    box-shadow: 0px 16px 30px ${(props) => props.theme[18]};
  }
`;

const Name = styled.h3`
  font: normal 600 16px/25px "Poppins", sans-serif;
  color: ${(props) => props.theme[21]};
  margin: 0px 0;
`;
const Contact = styled.p`
  font: normal 400 12px/20px "Poppins", sans-serif;
  color: ${(props) => props.theme[9]};
  margin: 0;
`;
const Subject = styled(Contact)`
  font-size: 16px;
  margin: 5px 0px;
  padding-top: 5px;
  color: ${(props) => props.theme[23]};
  border-top: solid 1px ${(props) => props.theme[6]};
`;

const ButtonRigth = styled.div<{ available: boolean }>`
  position: absolute;
  top: calc(50% - 24.3px);
  right: 0;
  Button {
    padding: 13px 20px;
    transition: transform 0.3s;
    opacity: ${(props) => (props.available ? 1 : 0.5)};
    &:hover {
      transform: ${(props) => (props.available ? "scale(1.1)" : "scale(1)")};
    }
  }
`;
const ButtonLeft = styled(ButtonRigth)`
  left: 0;
  right: 100%;
`;

const StatusContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  right: 20px;
  top: 10px;
`;

type PropsType = {
  title?: string;
  data: ContactType[];
  variant: number;
};

function ContactPreview(props: PropsType) {
  const { title, data, variant } = props;
  const [dataToRender, setDataToRender] = useState<ContactType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useContext(themeContext);
  const dispatch = useAppDispatch();

  const messageStyle = (remark: boolean) => {
    return {
      font: "normal 400 14px/20px 'Poppins', sans-serif",
      color: `${theme[9]}`,
      margin: "0",
      cursor: "pointer",
      fontWeight: `${remark ? "600" : "normal"}`,
    };
  };

  function handlePaginate(direction: string) {
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
      if (slice.length > 0) setDataToRender(slice);
      else handlePaginate("prev");
    } else {
      setDataToRender(data.slice(0, data.length));
    }
    setTotalPages(Math.ceil(data.length / 3));
  }, [data, currentPage]);

  return (
    <CardsContainer variant={variant} extraPadding={!!title} theme={theme}>
      {title && <Title theme={theme}>{title}</Title>}
      {dataToRender.map((item, index) => {
        return (
          <MyCard key={index} theme={theme}>
            <Name theme={theme}>{item.fullName}</Name>
            <Contact theme={theme}>
              {item.email} | {item.phone}
            </Contact>
            <Subject theme={theme}>{item.subject}</Subject>
            <Modal
              title={item.fullName}
              content={item.message}
              preview={
                item.message.length > 150
                  ? item.message.slice(0, 150) + "..."
                  : item.message
              }
              previewStyle={messageStyle(!item._read)}
              changeToOpen={
                !item._read
                  ? () =>
                      dispatch(
                        updateContact({
                          body: { ...item, _read: !item._read },
                          id: item._id,
                        })
                      )
                  : undefined
              }
            />
            <StatusContainer>
              {item._read && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="xl"
                  style={{
                    backgroundColor: "transparent",
                    color: `${theme[14]}`,
                  }}
                />
              )}
              {item.archived && (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="xl"
                  style={{
                    backgroundColor: "transparent",
                    color: `${theme[11]}`,
                  }}
                />
              )}
            </StatusContainer>
          </MyCard>
        );
      })}
      <ButtonLeft available={currentPage > 1}>
        <Button variant={1} onClick={() => handlePaginate("prev")}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </Button>
      </ButtonLeft>
      <ButtonRigth available={currentPage < totalPages}>
        <Button variant={1} onClick={() => handlePaginate("next")}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Button>
      </ButtonRigth>
    </CardsContainer>
  );
}

export default ContactPreview;
