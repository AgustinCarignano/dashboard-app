import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItemData } from "../../mockService/service.js";
import MainContainer from "../../components/MainContainer.jsx";
import Button from "../../components/Button.jsx";
import { fonts } from "../../theme/theme.js";
import Slider from "../../components/Slider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils.js";

const ItemContainer = styled.div`
  display: flex;
  border-radius: 20px;
  grid-column: 1/5;
  background-color: #fff;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 50%;
  padding: 40px;
  position: relative;
`;
const GuestContainer = styled.div`
  display: flex;
  gap: 50px;
`;
const GuestDetail = styled.div`
  h1 {
    font: ${fonts["style1"].font};
    color: ${fonts["style1"].color};
  }
  p {
    font: ${fonts["style4"].font};
    color: ${fonts["style4"].color};
  }
`;
const DatesContainer = styled.div`
  display: flex;
  border-bottom: solid 3px #f5f5f5;
  padding-bottom: 20px;
  div {
    width: 50%;
  }
`;
const Subtitle = styled.p`
  font: ${fonts["style5"].font};
  color: ${fonts["style5"].color};
  padding: 5px 0;
`;
const Dates = styled.p`
  font: ${fonts["style3"].font};
  color: ${fonts["style3"].color};
  padding: 5px 0;
`;
const RoomsContainer = styled.div`
  display: flex;
  div {
    width: 50%;
  }
`;
const RoomsDetail = styled.p`
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
  flex-direction: column;
  width: 50%;
  position: relative;
  img {
    width: 100%;
  }
`;
const RoomInfoContainer = styled.div`
  padding: 30px 40px;
`;
const BookingStatus = styled.span`
  display: inline-block;
  width: 300px;
  text-align: center;
  padding: 20px;
  color: #fff;
  font: normal 600 14px/21px "Poppins", sans-serif;
  position: absolute;
  top: 20px;
  right: -100px;
  transform: rotate(45deg);
  background-color: ${(props) =>
    props.children === "CHECK IN"
      ? "#5AD07A"
      : props.children === "CHECK OUT"
      ? "#E23428"
      : "#FF9C3A"};
`;

function BookingDetail() {
  const [item, setItem] = useState([]);
  const [room, setRoom] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const amenitites = [
    "3 Bed Space",
    "24 Hours Guard",
    "Free WiFi",
    "2 Bathroom",
    "Air Conditioner",
    "Television",
  ];

  function handleRedirect() {
    const path = `/dashboard-app/bookings/update/${id}`;
    navigate(path);
  }

  const [checkInDate, checkInTime] = formatDate(item.checkIn);
  const [checkOutDate] = formatDate(item.checkOut);

  async function getBookingData() {
    const data = await getItemData("bookings_data.json", id);
    setItem(data);
  }

  async function getRoomData() {
    const data = await getItemData("rooms_data.json", item.roomId);
    setRoom(data);
  }

  useEffect(() => {
    getBookingData();
  }, []);

  useEffect(() => {
    if (!item.roomId) return;
    getRoomData();
  }, [item]);

  if (item.length === 0) return <h1>Loading</h1>;

  return (
    <MainContainer>
      <ItemContainer>
        <LeftColumn>
          <GuestContainer>
            <GuestDetail>
              <h1>{item.guest}</h1>
              <p>ID {item.id}</p>
            </GuestDetail>
          </GuestContainer>
          <DatesContainer>
            <div>
              <Subtitle>Check In</Subtitle>
              <Dates>
                {checkInDate} | {checkInTime}
              </Dates>
            </div>
            <div>
              <Subtitle>Check Out</Subtitle>
              <Dates>{checkOutDate}</Dates>
            </div>
          </DatesContainer>
          <RoomsContainer>
            <div>
              <Subtitle>Rooms Info</Subtitle>
              <RoomsDetail>{item.roomNumber}</RoomsDetail>
            </div>
            <div>
              <Subtitle>Price</Subtitle>
              <RoomsDetail>$875</RoomsDetail>
            </div>
          </RoomsContainer>
          {item.specialRequest && (
            <TextContent>{item.specialRequest}</TextContent>
          )}
          <div>
            <Subtitle>Amenities</Subtitle>
            <AmenitiesContainer>
              {amenitites.map((item, index) => (
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
        {room.length === 0 ? (
          <h2>Loafing</h2>
        ) : (
          <RightColumn>
            <Slider photos={room.photos} />
            <RoomInfoContainer>
              <RoomsDetail>{room.roomType}</RoomsDetail>
              <TextContent>{room.description}</TextContent>
            </RoomInfoContainer>
            <BookingStatus>{item.status.toUpperCase()}</BookingStatus>
          </RightColumn>
        )}
      </ItemContainer>
    </MainContainer>
  );
}

export default BookingDetail;
