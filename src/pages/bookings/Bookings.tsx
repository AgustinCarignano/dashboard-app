import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useFetchWrapp,
} from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import MainContainer from "../../components/MainContainer";
import Table, {
  IRowItem,
  RowContainer,
  RowDataBigger,
  RowDataSmaller,
} from "../../components/Table";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { formatDate } from "../../utils/dateUtils";
import Popup from "../../components/Popup";
import {
  selectBookings,
  selectIsLoading,
  selectHasError,
  getBookingsData,
  deleteBooking,
} from "../../store/slices/bookingSlice";
import Loader from "../../components/Loader";
import DeleteItem from "../../components/DeleteItem";
import { themeContext } from "../../context/ThemeContext";
import { BookingType } from "../../@types/bookings";
import AppError from "../../components/AppError";

const availableStates = {
  "Check In": 6,
  "Check Out": 7,
  "In Progress": 8,
};

function Bookings() {
  const data = useAppSelector(selectBookings);
  const isLoadingData = useAppSelector(selectIsLoading);
  const hasError = useAppSelector(selectHasError);
  const dispatch = useAppDispatch();
  const wrappedDispatch = useFetchWrapp(getBookingsData);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [orderedData, setOrderedData] = useState<BookingType[]>([]);
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [revOrder, setRevOrder] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();
  const tabs = ["All Bookings", "Checking In", "Checking Out", "In Progress"];

  const optionsMenu = [
    {
      label: "Details",
      action: (itemId: string) => navigate(`/dashboard-app/bookings/${itemId}`),
    },
    {
      label: "Edit",
      action: (itemId: string) =>
        navigate(`/dashboard-app/bookings/update/${itemId}`),
    },
    {
      label: "Delete",
      dataCy: "delete_one_",
      action: (itemId: string) => {
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

  const rowsToRender = (item: BookingType): IRowItem => {
    const [orderDate, orderTime] = formatDate(item.orderDate);
    const [checkInDate, checkInTime] = formatDate(item.checkIn);
    const [checkOutDate, checkOutTime] = formatDate(item.checkOut);
    return {
      id: item._id,
      rowData: [
        <div onClick={() => handleRedirect(item._id)}>
          <RowDataBigger>{item.guest}</RowDataBigger>
          <RowDataSmaller theme={theme}>#{item._id}</RowDataSmaller>
        </div>,
        <div>
          <p>{orderDate}</p>
          <p>{orderTime}</p>
        </div>,
        <div>
          <p>{checkInDate}</p>
          <p>{checkInTime}</p>
        </div>,
        <div>
          <p>{checkOutDate}</p>
          <p>{checkOutTime}</p>
        </div>,
        <Modal
          title={item.guest}
          content={item.specialRequest}
          preview={
            <Button
              variant={item.specialRequest ? 3 : 4}
              onClick={item.specialRequest ? () => {} : undefined}
            >
              View Notes
            </Button>
          }
        />,
        <>{item.roomType}</>,
        <RowContainer justify="space-between">
          <Button
            variant={
              availableStates[item.status as keyof typeof availableStates]
            }
            style={{ width: "100%" }}
          >
            {item.status}
          </Button>
          <Popup
            options={optionsMenu}
            withArrow={false}
            itemId={item._id}
            dataCy={"booking_action_options_" + item._id}
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

  function filterData(dataArr: BookingType[], tab: string, rev: boolean) {
    const orderList = (arr: BookingType[], criteria: keyof BookingType) => {
      arr.sort((a, b) => {
        let revMult = rev ? -1 : 1;
        if (a[criteria] > b[criteria]) return -1 * revMult;
        else if (a[criteria] < b[criteria]) return 1 * revMult;
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

  function handleRedirect(id: string) {
    const path = `/dashboard-app/bookings/${id}`;
    navigate(path);
  }

  function handleDeleteItem() {
    dispatch(deleteBooking(itemToDelete));
    setShowConfirm(false);
  }

  function handleLoadError() {
    wrappedDispatch();
  }

  function handleOrderByDate() {
    setRevOrder((prev) => !prev);
  }

  useEffect(() => {
    const copyOfData = structuredClone(data);
    const newData = filterData(copyOfData, activeTab, revOrder);
    const searchData = newData.filter((item) =>
      item.guest.toLowerCase().includes(searchTerms.toLowerCase())
    );
    setOrderedData(searchData);
  }, [data, activeTab, searchTerms, revOrder]);

  useEffect(() => {
    wrappedDispatch();
  }, []);

  if (hasError)
    return (
      <MainContainer>
        <AppError reload={handleLoadError} />
      </MainContainer>
    );
  return (
    <MainContainer>
      <>
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
            rowsGenerator={rowsToRender}
            newBtn="New Booking"
            newestAction={handleOrderByDate}
            newestText={revOrder ? "Oldest" : "Newest"}
            paginate={true}
            draggableRow={false}
          />
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

export default Bookings;
