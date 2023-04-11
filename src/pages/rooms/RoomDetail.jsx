import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRoomDetails,
  selectRoomDetails,
  selectIsLoading,
} from "./roomSlice.js";
import MainContainer from "../../components/MainContainer.jsx";
import Button from "../../components/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Slider from "../../components/Slider.jsx";
import Loader from "../../components/Loader.jsx";
import {
  ItemContainer,
  LeftColumn,
  PrimaryContainer,
  SecondaryContainer,
  DetailHeader,
  Subtitle,
  DetailBigger,
  TextContent,
  AmenitiesContainer,
  EditBtn,
  DetailImg,
  RightColumn,
} from "../../components/DetailComponents.jsx";
import Popup from "../../components/Popup.jsx";
import DeleteItem from "../../components/DeleteItem.jsx";

function RoomDetail() {
  const [showConfirm, setShowConfirm] = useState(false);
  const item = useSelector(selectRoomDetails);
  const isLoadingData = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const optionsMenu = [
    {
      label: "Edit Room",
      action: (itemId) => navigate(`/dashboard-app/rooms/update/${itemId}`),
    },
    {
      label: "Delete Room",
      action: () => {
        setShowConfirm(true);
      },
    },
  ];

  /* function handleDeleteItem() {
    dispatch(deleteRoom(item.id));
    navigate(`/dashboard-app/rooms`);
  } */

  useEffect(() => {
    dispatch(getRoomDetails(id));
  }, []);

  return (
    <MainContainer>
      {isLoadingData ? (
        <Loader />
      ) : (
        <ItemContainer>
          <LeftColumn>
            <PrimaryContainer>
              <DetailImg>
                <img src={item.photos[0]} alt="" />
              </DetailImg>
              <DetailHeader>
                <h1>{item.roomNumber}</h1>
                <p>ID {item.id}</p>
              </DetailHeader>
            </PrimaryContainer>
            <SecondaryContainer border={false} padding={false}>
              <div>
                <Subtitle>Type</Subtitle>
                <DetailBigger>{item.roomType}</DetailBigger>
              </div>
              <div>
                <Subtitle>Price</Subtitle>
                <DetailBigger>{item.price}</DetailBigger>
              </div>
            </SecondaryContainer>
            <SecondaryContainer border={true} padding={true}>
              <div>
                <Subtitle>Offer</Subtitle>
                <DetailBigger>{item.offer ? "YES" : "NO"}</DetailBigger>
              </div>
              <div>
                <Subtitle>Discount</Subtitle>
                <DetailBigger>
                  {item.discount ? item.discount : "N/A"}
                </DetailBigger>
              </div>
            </SecondaryContainer>
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
          <RightColumn justify="center" background="#c5c5c5">
            <Slider photos={item.photos} />
          </RightColumn>
        </ItemContainer>
      )}
      {showConfirm && (
        <DeleteItem
          handleClose={() => setShowConfirm((prev) => !prev)}
          handleDelete={() => console.log("put the function handleDeleteItem")}
        />
      )}
    </MainContainer>
  );
}

export default RoomDetail;
