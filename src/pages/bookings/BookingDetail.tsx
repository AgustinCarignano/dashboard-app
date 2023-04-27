import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MainContainer from "../../components/MainContainer";
import Button from "../../components/Button";
import Slider from "../../components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils";
import {
  selectBookingDetail,
  selectIsLoading as loadingBookingData,
  getBookingDetails,
  deleteBooking,
} from "../../store/slices/bookingSlice";
import Loader from "../../components/Loader";
import {
  getRoomDetails,
  selectRoomDetails,
  selectIsLoading as loadingRoomData,
} from "../../store/slices/roomSlice";
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
} from "../../components/DetailComponents";
import Popup from "../../components/Popup";
import DeleteItem from "../../components/DeleteItem";
import { themeContext } from "../../context/ThemeContext";

function BookingDetail() {
  const [showConfirm, setShowConfirm] = useState(false);
  const item = useAppSelector(selectBookingDetail);
  const isLoadingBookingData = useAppSelector(loadingBookingData);
  const room = useAppSelector(selectRoomDetails);
  const isLoadingRoomData = useAppSelector(loadingRoomData);
  const { theme } = useContext(themeContext);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const tabSpace: string = "\u00A0\u00A0";

  const amenitites = [
    "3 Bed Space",
    "24 Hours Guard",
    "Free WiFi",
    "2 Bathroom",
    "Air Conditioner",
    "Television",
  ];

  const [checkInDate, checkInTime] = item.checkIn
    ? formatDate(item.checkIn)
    : [];
  const [checkOutDate] = item.checkOut ? formatDate(item.checkOut) : [];

  const optionsMenu = [
    {
      label: "Edit Booking",
      action: (itemId: string) =>
        navigate(`/dashboard-app/bookings/update/${itemId}`),
    },
    {
      label: "Delete Booking",
      action: () => {
        setShowConfirm(true);
      },
    },
  ];

  async function handleDeleteItem() {
    try {
      await dispatch(deleteBooking(item.id)).unwrap();
      navigate(`/dashboard-app/bookings`);
    } catch (error) {
      setShowConfirm(false);
      console.log("there has been an error", error);
    }
  }

  useEffect(() => {
    if (id && item.id !== id) dispatch(getBookingDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!item.roomId) return;
    dispatch(getRoomDetails(item.roomId));
  }, [item, dispatch]);

  return (
    <MainContainer>
      <>
        {isLoadingBookingData ? (
          <Loader />
        ) : (
          <ItemContainer theme={theme} data-cy="bookingDetail">
            <LeftColumn>
              <PrimaryContainer>
                <DetailHeader theme={theme}>
                  <h1>{item.guest}</h1>
                  <p>ID {item.id}</p>
                </DetailHeader>
              </PrimaryContainer>
              <SecondaryContainer border={true} padding={true} theme={theme}>
                <div>
                  <Subtitle theme={theme}>Check In</Subtitle>
                  <DetailSmaller theme={theme}>
                    {checkInDate} | {checkInTime}
                  </DetailSmaller>
                </div>
                <div>
                  <Subtitle theme={theme}>Check Out</Subtitle>
                  <DetailSmaller theme={theme}>{checkOutDate}</DetailSmaller>
                </div>
              </SecondaryContainer>
              <SecondaryContainer border={false} padding={false} theme={theme}>
                <div>
                  <Subtitle theme={theme}>Rooms Info</Subtitle>
                  <DetailBigger theme={theme}>{item.roomNumber}</DetailBigger>
                </div>
                <div>
                  <Subtitle theme={theme}>Price</Subtitle>
                  <DetailBigger theme={theme}>$875</DetailBigger>
                </div>
              </SecondaryContainer>
              {item.specialRequest && (
                <TextContent theme={theme}>{item.specialRequest}</TextContent>
              )}
              <div>
                <Subtitle theme={theme}>Amenities</Subtitle>
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
                      {tabSpace} Actions {tabSpace}
                    </Button>
                  }
                  options={optionsMenu}
                  itemId={item.id}
                  withArrow
                />
              </EditBtn>
            </LeftColumn>
            {room.photos && !isLoadingRoomData && (
              <RightColumn justify="normal" background={false} theme={theme}>
                <Slider photos={room.photos} />
                <RoomInfoContainer>
                  <DetailBigger theme={theme}>{room.roomType}</DetailBigger>
                  <TextContent theme={theme}>{room.description}</TextContent>
                </RoomInfoContainer>
                <BookingStatus theme={theme}>
                  {item.status.toUpperCase()}
                </BookingStatus>
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
      </>
    </MainContainer>
  );
}

export default BookingDetail;
