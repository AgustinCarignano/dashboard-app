import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  selectRooms,
  selectIsLoading,
  getRoomsData,
  deleteRoom,
} from "../../store/slices/roomSlice";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import Table, {
  ImgRowContainer,
  RowContainer,
  RowDataSmaller,
} from "../../components/Table";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup.jsx";
import DeleteItem from "../../components/DeleteItem.jsx";
import { themeContext } from "../../context/ThemeContext";

const availableStates = {
  Available: 6,
  Booked: 7,
};

function Rooms() {
  const data = useSelector(selectRooms);
  const isLoadingData = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [dataToRender, setDataToRender] = useState([]);
  const [activeTab, setActiveTab] = useState("All Rooms");
  const [orderBy, setOrderBy] = useState("roomNumber");
  const [ascPrice, setAscPrice] = useState(false);
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();
  const tabs = ["All Rooms", "Availables"];

  const optionsMenu = [
    {
      label: "Details",
      action: (itemId) => navigate(`/rooms/${itemId}`),
    },
    {
      label: "Edit",
      action: (itemId) => navigate(`/rooms/update/${itemId}`),
    },
    {
      label: "Delete",
      action: (itemId) => {
        setItemToDelete(itemId);
        setShowConfirm(true);
      },
    },
  ];

  const tableHeader = [
    { label: "Room", action: () => setOrderBy("roomNumber") },
    { label: "Room Type" },
    { label: "Amenities" },
    {
      label: "Price",
      action: () => {
        setOrderBy("price");
        setAscPrice((prev) => !prev);
      },
    },
    { label: "Offer Price" },
    {
      label: "Status",
      action: () => setOrderBy("status"),
    },
  ];

  function handleRedirect(id) {
    const path = `/rooms/${id}`;
    navigate(path);
  }

  function handleDeleteItem() {
    dispatch(deleteRoom(itemToDelete));
    setShowConfirm(false);
  }

  const rowsToRender = (item) => {
    return {
      id: item.id,
      rowData: [
        <RowContainer justify="normal" onClick={() => handleRedirect(item.id)}>
          <ImgRowContainer aspectRatio="3/2">
            <img src={item.photos[0]} alt="thumbnail" />
          </ImgRowContainer>
          <div>
            <p>{item.roomNumber}</p>
            <RowDataSmaller theme={theme}>#{item.id}</RowDataSmaller>
          </div>
        </RowContainer>,
        item.roomType,
        <div style={{ maxWidth: "375px" }}>
          {item.amenities.map((el, i, arr) =>
            i < arr.length - 1 ? `${el}, ` : `${el}.`
          )}
        </div>,
        "$" + item.price,
        <div>
          $
          {item.offer
            ? item.price * (1 - parseInt(item.discount) / 100)
            : item.price}
        </div>,
        <RowContainer justify="space-between">
          <Button
            variant={availableStates[item.status]}
            style={{ width: "100%" }}
          >
            {item.status}
          </Button>
          <Popup
            options={optionsMenu}
            itemId={item.id}
            preview={
              <FontAwesomeIcon
                color="#6E6E6E"
                icon={faEllipsisVertical}
                size="xl"
              />
            }
          />
        </RowContainer>,
      ],
    };
  };

  useEffect(() => {
    const newData = structuredClone(data);
    let manipulatedData = [];
    if (activeTab === "Availables") {
      const filterData = newData.filter((item) => item.status === "Available");
      manipulatedData = filterData;
    } else {
      manipulatedData = newData;
    }
    manipulatedData.sort((a, b) => {
      let inv = 1;
      if (ascPrice && orderBy === "price") inv = -1;
      if (a[orderBy] > b[orderBy]) return inv * 1;
      else if (a[orderBy] < b[orderBy]) return inv * -1;
      else return 0;
    });
    setDataToRender(manipulatedData);
  }, [activeTab, data, orderBy, ascPrice]);

  useEffect(() => {
    dispatch(getRoomsData());
  }, [dispatch]);

  return (
    <MainContainer>
      {isLoadingData ? (
        <Loader />
      ) : (
        <Table
          data={dataToRender}
          option="rooms"
          tableHeader={tableHeader}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          rowsGenerator={rowsToRender}
          newBtn="New Room"
          paginate={true}
          draggableRow={true}
        />
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

export default Rooms;
