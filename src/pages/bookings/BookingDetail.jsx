import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MainContainer from "../../components/MainContainer.jsx";
import Button from "../../components/Button.jsx";
import Slider from "../../components/Slider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils.js";
import {
  selectBookingDetail,
  selectIsLoading as loadingBookingData,
  selectHasError,
  getBookingDetails,
  deleteBooking,
} from "./bookingSlice.js";
import Loader from "../../components/Loader.jsx";
import {
  getRoomDetails,
  selectRoomDetails,
  selectIsLoading as loadingRoomData,
} from "../rooms/roomSlice.js";
import {
  ItemContainer,
  LeftColumn,
  PrimaryContainer,
  DetailHeader,
  SecondaryContainer,
  Subtitle,
  DetailSmaller,
  DetailBigger,
  TextContent,
  AmenitiesContainer,
  EditBtn,
  RightColumn,
  RoomInfoContainer,
  BookingStatus,
} from "../../components/DetailComponents.jsx";
import Popup from "../../components/Popup.jsx";
import DeleteItem from "../../components/DeleteItem.jsx";

function BookingDetail() {
  const [showConfirm, setShowConfirm] = useState(false);
  const item = useSelector(selectBookingDetail);
  const isLoadingBookingData = useSelector(loadingBookingData);
  const room = useSelector(selectRoomDetails);
  const isLoadingRoomData = useSelector(loadingRoomData);
  const dispatch = useDispatch();
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

  const [checkInDate, checkInTime] = formatDate(item.checkIn);
  const [checkOutDate] = formatDate(item.checkOut);

  const optionsMenu = [
    {
      label: "Edit Booking",
      action: (itemId) => navigate(`/dashboard-app/bookings/update/${itemId}`),
    },
    {
      label: "Delete Booking",
      action: () => {
        setShowConfirm(true);
      },
    },
  ];

  function handleDeleteItem() {
    dispatch(deleteBooking(item.id));
    navigate(`/dashboard-app/bookings`);
  }

  useEffect(() => {
    dispatch(getBookingDetails(id));
  }, []);

  useEffect(() => {
    if (!item.roomId) return;
    dispatch(getRoomDetails(item.roomId));
  }, [item]);

  return (
    <MainContainer>
      {isLoadingBookingData ? (
        <Loader />
      ) : (
        <ItemContainer>
          <LeftColumn>
            <PrimaryContainer>
              <DetailHeader>
                <h1>{item.guest}</h1>
                <p>ID {item.id}</p>
              </DetailHeader>
            </PrimaryContainer>
            <SecondaryContainer border={true} padding={true}>
              <div>
                <Subtitle>Check In</Subtitle>
                <DetailSmaller>
                  {checkInDate} | {checkInTime}
                </DetailSmaller>
              </div>
              <div>
                <Subtitle>Check Out</Subtitle>
                <DetailSmaller>{checkOutDate}</DetailSmaller>
              </div>
            </SecondaryContainer>
            <SecondaryContainer border={false} padding={false}>
              <div>
                <Subtitle>Rooms Info</Subtitle>
                <DetailBigger>{item.roomNumber}</DetailBigger>
              </div>
              <div>
                <Subtitle>Price</Subtitle>
                <DetailBigger>$875</DetailBigger>
              </div>
            </SecondaryContainer>
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
            <EditBtn>
              <Popup
                preview={
                  <Button variant={5} style={{ fontSize: "20px" }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Actions
                  </Button>
                }
                options={optionsMenu}
                itemId={item.id}
              />
            </EditBtn>
          </LeftColumn>
          {!isLoadingRoomData && (
            <RightColumn justify="normal">
              <Slider photos={room.photos} />
              <RoomInfoContainer>
                <DetailBigger>{room.roomType}</DetailBigger>
                <TextContent>{room.description}</TextContent>
              </RoomInfoContainer>
              <BookingStatus>{item.status.toUpperCase()}</BookingStatus>
            </RightColumn>
          )}
        </ItemContainer>
      )}
      {showConfirm && (
        <DeleteItem
          handleClose={() => setShowConfirm((prev) => !prev)}
          handleDelete={handleDeleteItem}
        />
      )}
    </MainContainer>
  );
}

export default BookingDetail;
