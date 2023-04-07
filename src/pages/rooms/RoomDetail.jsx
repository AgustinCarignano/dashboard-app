import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getItemData } from "../../mockService/service.js";
import MainContainer from "../../components/MainContainer.jsx";
import Button from "../../components/Button.jsx";
import { fonts } from "../../theme/theme.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Slider from "../../components/Slider.jsx";

const ItemContainer = styled.div`
  display: flex;
  border-radius: 20px;
  grid-column: 1/5;
  background-color: #fff;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 50%;
  padding: 40px;
`;
const RoomHeaderContainer = styled.div`
  display: flex;
  gap: 50px;
`;
const RoomImg = styled.div`
  width: 25%;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
const RoomIdentify = styled.div`
  h1 {
    font: ${fonts["style1"].font};
    color: ${fonts["style1"].color};
  }
  p {
    font: ${fonts["style4"].font};
    color: ${fonts["style4"].color};
  }
`;
const DetailsContainer = styled.div`
  display: flex;
  border-bottom: ${(props) => (props.border ? "solid 3px #f5f5f5" : "none")};
  padding-bottom: ${(props) => (props.padding ? "20px" : "0")};
  div {
    width: 50%;
  }
`;
const Subtitle = styled.p`
  font: ${fonts["style5"].font};
  color: ${fonts["style5"].color};
  padding: 5px 0;
`;
const Data = styled.p`
  font: ${fonts["style2"].font};
  color: ${fonts["style2"].color};
  padding: 5px 0;
`;
const TextContent = styled.p`
  font: ${fonts["style7"].font};
  color: ${fonts["style7"].color};
`;
const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .remark {
    transform: scale(1.2);
    margin: 15px 15px 0;
  }
`;
const EditBtn = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 50%;
  background-color: #c5c5c5;
`;

function RoomDetail() {
  const [item, setItem] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getData() {
    const data = await getItemData("rooms_data.json", id);
    setItem(data);
  }
  function handleRedirect() {
    const path = `/dashboard-app/rooms/update/${item.id}`;
    navigate(path);
  }

  useEffect(() => {
    getData();
  }, []);

  if (item.length === 0) return <h1>Loading</h1>;
  return (
    <MainContainer>
      <ItemContainer>
        <LeftColumn>
          <RoomHeaderContainer>
            <RoomImg>
              <img src={item.photos[0]} alt="" />
            </RoomImg>
            <RoomIdentify>
              <h1>{item.roomNumber}</h1>
              <p>ID {item.id}</p>
            </RoomIdentify>
          </RoomHeaderContainer>
          <DetailsContainer border={false} padding={false}>
            <div>
              <Subtitle>Type</Subtitle>
              <Data>{item.roomType}</Data>
            </div>
            <div>
              <Subtitle>Price</Subtitle>
              <Data>{item.price}</Data>
            </div>
          </DetailsContainer>
          <DetailsContainer border={true} padding={true}>
            <div>
              <Subtitle>Offer</Subtitle>
              <Data>{item.offer ? "YES" : "NO"}</Data>
            </div>
            <div>
              <Subtitle>Discount</Subtitle>
              <Data>{item.discount ? item.discount : "N/A"}</Data>
            </div>
          </DetailsContainer>
          <TextContent>{item.cancellation}</TextContent>
          <div>
            <Subtitle>Amenities</Subtitle>
            <AmenitiesContainer>
              {item.amenities.map((item, index) => (
                <Button variant={2} key={index}>
                  {item}
                </Button>
              ))}
            </AmenitiesContainer>
          </div>
          <EditBtn onClick={handleRedirect}>
            <Button variant={5} style={{ fontSize: "20px" }}>
              <FontAwesomeIcon icon={faPenToSquare} />
              Edit
            </Button>
          </EditBtn>
        </LeftColumn>
        <RightColumn>
          <Slider photos={item.photos} />
        </RightColumn>
      </ItemContainer>
    </MainContainer>
  );
}

export default RoomDetail;
