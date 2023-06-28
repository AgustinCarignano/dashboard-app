import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRoomDetails,
  selectRoomDetails,
  selectIsLoading,
  deleteRoom,
} from "../../store/slices/roomSlice.js";
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
import { themeContext } from "../../context/ThemeContext.jsx";

function RoomDetail() {
  const [showConfirm, setShowConfirm] = useState(false);
  const item = useSelector(selectRoomDetails);
  const isLoadingData = useSelector(selectIsLoading);
  const { theme } = useContext(themeContext);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const tabSpace = "\u00A0\u00A0";

  const optionsMenu = [
    {
      label: "Edit Room",
      action: (itemId) => navigate(`/rooms/update/${itemId}`),
    },
    {
      label: "Delete Room",
      action: () => {
        setShowConfirm(true);
      },
    },
  ];

  async function handleDeleteItem() {
    try {
      await dispatch(deleteRoom(item.id)).unwrap();
      navigate(`/rooms`);
    } catch (error) {
      setShowConfirm(false);
      console.log("there has been an error", error);
    }
  }

  useEffect(() => {
    if (item.id !== id) dispatch(getRoomDetails(id));
  }, [dispatch, item, id]);

  return (
    <MainContainer>
      {isLoadingData || !item.photos ? (
        <Loader />
      ) : (
        <ItemContainer theme={theme}>
          <LeftColumn>
            <PrimaryContainer>
              <DetailImg>
                <img src={item.photos[0]} alt="" />
              </DetailImg>
              <DetailHeader theme={theme}>
                <h1>{item.roomNumber}</h1>
                <p>ID {item.id}</p>
              </DetailHeader>
            </PrimaryContainer>
            <SecondaryContainer border={false} padding={false} theme={theme}>
              <div>
                <Subtitle theme={theme}>Type</Subtitle>
                <DetailBigger theme={theme}>{item.roomType}</DetailBigger>
              </div>
              <div>
                <Subtitle theme={theme}>Price</Subtitle>
                <DetailBigger theme={theme}>{item.price}</DetailBigger>
              </div>
            </SecondaryContainer>
            <SecondaryContainer border={true} padding={true} theme={theme}>
              <div>
                <Subtitle theme={theme}>Offer</Subtitle>
                <DetailBigger theme={theme}>
                  {item.offer ? "YES" : "NO"}
                </DetailBigger>
              </div>
              <div>
                <Subtitle theme={theme}>Discount</Subtitle>
                <DetailBigger theme={theme}>
                  {item.discount ? item.discount : "N/A"}
                </DetailBigger>
              </div>
            </SecondaryContainer>
            <TextContent theme={theme}>{item.cancellation}</TextContent>
            <div>
              <Subtitle theme={theme}>Amenities</Subtitle>
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
                    {tabSpace} Actions {tabSpace}
                  </Button>
                }
                options={optionsMenu}
                itemId={item.id}
                withArrow
              />
            </EditBtn>
          </LeftColumn>
          <RightColumn justify="center" background theme={theme}>
            <Slider photos={item.photos} />
          </RightColumn>
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

export default RoomDetail;
