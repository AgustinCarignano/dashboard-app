import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import Table, { RowContainer } from "../../components/Table";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { formatDate } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { RowDataBigger, RowDataSmaller } from "../../components/Table";
import Popup from "../../components/Popup";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBookings,
  selectIsLoading,
  selectHasError,
  getBookingsData,
  deleteBooking,
} from "./bookingSlice";
import Loader from "../../components/Loader";
import DeleteItem from "../../components/DeleteItem";
import { themeContext } from "../../context/ThemeContext";

const availableStates = {
  "Check In": 6,
  "Check Out": 7,
  "In Progress": 8,
};

function Bookings() {
  const data = useSelector(selectBookings);
  const isLoadingData = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [orderedData, setOrderedData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [searchTerms, setSearchTerms] = useState("");
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();
  const tabs = ["All Bookings", "Checking In", "Checking Out", "In Progress"];

  const optionsMenu = [
    {
      label: "Details",
      action: (itemId) => navigate(`/dashboard-app/bookings/${itemId}`),
    },
    {
      label: "Edit",
      action: (itemId) => navigate(`/dashboard-app/bookings/update/${itemId}`),
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
    { label: "Guest" },
    { label: "Order Date" },
    { label: "Check In" },
    { label: "Check Out" },
    { label: "Special Request" },
    { label: "Room Type" },
    { label: "Status" },
  ];

  const rowsToRender = (item) => {
    const [orderDate, orderTime] = formatDate(item.orderDate);
    const [checkInDate, checkInTime] = formatDate(item.checkIn);
    const [checkOutDate, checkOutTime] = formatDate(item.checkOut);
    return (
      <>
        <td onClick={() => handleRedirect(item.id)}>
          <RowDataBigger>{item.guest}</RowDataBigger>
          <RowDataSmaller theme={theme}>#{item.id}</RowDataSmaller>
        </td>
        <td>
          <p>{orderDate}</p>
          <p>{orderTime}</p>
        </td>
        <td>
          <p>{checkInDate}</p>
          <p>{checkInTime}</p>
        </td>
        <td>
          <p>{checkOutDate}</p>
          <p>{checkOutTime}</p>
        </td>
        <td>
          <Modal
            title={item.guest}
            content={item.specialRequest}
            preview={
              <Button variant={item.specialRequest ? 3 : 4}>View Notes</Button>
            }
          />
        </td>
        <td>{item.roomType}</td>
        <td>
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
          </RowContainer>
        </td>
      </>
    );
  };

  function filterData(dataArr, tab) {
    const orderList = (arr, criteria) => {
      arr.sort((a, b) => {
        if (a[criteria] > b[criteria]) return -1;
        else if (a[criteria] < b[criteria]) return 1;
        return 0;
      });
      return arr;
    };
    if (tab === "All Bookings") return orderList(dataArr, "orderDate");
    if (tab === "Checking In") return orderList(dataArr, "checkIn");
    if (tab === "Checking Out") return orderList(dataArr, "checkOut");
    if (tab === "In Progress") {
      const filterArr = dataArr.filter((item) => item.status === "In Progress");
      return orderList(filterArr, "orderDate");
    }
    return dataArr;
  }

  function handleRedirect(id) {
    const path = `/dashboard-app/bookings/${id}`;
    navigate(path);
  }

  function handleDeleteItem() {
    dispatch(deleteBooking(itemToDelete));
    setShowConfirm(false);
  }

  useEffect(() => {
    const copyOfData = structuredClone(data);
    const newData = filterData(copyOfData, activeTab);
    const searchData = newData.filter((item) =>
      item.guest.toLowerCase().includes(searchTerms.toLowerCase())
    );
    setOrderedData(searchData);
  }, [data, activeTab, searchTerms]);

  useEffect(() => {
    dispatch(getBookingsData());
  }, []);

  return (
    <MainContainer>
      {isLoadingData ? (
        <Loader />
      ) : (
        <Table
          data={orderedData}
          option="bookings"
          tableHeader={tableHeader}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSearchTerms={setSearchTerms}
          rows={rowsToRender}
          newBtn="New Booking"
          newestAction={() => setActiveTab("All Bookings")}
          paginate={true}
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

export default Bookings;
