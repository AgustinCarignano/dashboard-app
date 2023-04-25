import React, { useContext, useEffect, useState } from "react";
import {
  getAllContacts,
  selectContacts,
  selectIsLoading as selectLoadingBookings,
} from "../../store/slices/contactSlice.js";
import {
  getBookingsData,
  selectBookings,
  selectIsLoading as selectLoadingContacts,
} from "../../store/slices/bookingSlice.js";
import SmallCard from "../../components/SmallCard.js";
import MainContainer from "../../components/MainContainer.js";
import ContactPreview from "../../components/ContactPreview.js";
import { formatDate } from "../../utils.js";
import Table, { IRowItem } from "../../components/Table.js";
import styled from "styled-components";
import Loader from "../../components/Loader.js";
import { themeContext } from "../../context/ThemeContext.js";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks.js";
import { BookingType } from "../../@types/bookings.js";

const FirstColumn = styled.div`
  display: flex;
  gap: 20px;
  margin-right: -80px;
  img {
    width: 50%;
    max-width: 150px;
    aspect-ratio: 16/9;
    border-radius: 8px;
  }
  div {
    width: 50%;
    h4 {
      font: normal 500 20px/30px "Poppins", Sans-Serif;
      color: ${(props) => props.theme[17]};
    }
    p {
      font: normal 400 14px/21px "Poppins", Sans-Serif;
      color: ${(props) => props.theme[23]};
    }
  }
`;

const cardsInfo = [
  { type: "newBooking", number: 8461 },
  { type: "schedule", number: "63%" },
  { type: "checkIn", number: 753 },
  { type: "checkOut", number: 516 },
];

function Dashboard() {
  const bookingsData = useAppSelector(selectBookings);
  const isLoadingBookings = useAppSelector(selectLoadingBookings);
  const latestContact = useAppSelector(selectContacts);
  const isLoadingContacts = useAppSelector(selectLoadingContacts);
  const theme = useContext(themeContext);
  const dispatch = useAppDispatch();
  const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);

  const tableHeader = [
    { label: "Room" },
    { label: "Guest" },
    { label: "Check In" },
    { label: "Check Out" },
  ];

  //const rowsToRender = (item:BookingType):IRowItem =>
  const rowsToRender = (item): IRowItem => {
    let [checkInDate, checkInTime] = item.checkIn
      ? formatDate(item.checkIn)
      : "";
    let [checkOutDate, checkOutTime] = item.checkOut
      ? formatDate(item.checkOut)
      : "";
    return {
      id: item.id,
      rowData: [
        <FirstColumn theme={theme}>
          <img src={item.roomImg} alt={"room" + item.roomNumber} />
          <div>
            <h4>{item.roomType}</h4>
            <p>{item.roomNumber}</p>
          </div>
        </FirstColumn>,
        <div>{item.guest}</div>,
        <div>
          <p>{checkInDate}</p>
          <p>{checkInTime}</p>
        </div>,
        <div>
          <p>{checkOutDate}</p>
          <p>{checkOutTime}</p>
        </div>,
      ],
    };
  };

  useEffect(() => {
    dispatch(getBookingsData());
    dispatch(getAllContacts());
  }, [dispatch]);

  useEffect(() => {
    const period = {
      start: 1647298800000,
      end: 1649973600000,
    };
    if (bookingsData.length > 0) {
      const filterData = bookingsData.filter((item) => {
        if (item.orderDate) {
          return item.orderDate > period.start && item.orderDate < period.end;
        }
      });
      setFilteredBookings(filterData);
    }
  }, [bookingsData]);

  return (
    <MainContainer>
      <>
        {cardsInfo.map((item, index) => (
          <SmallCard type={item.type} number={item.number} key={index} />
        ))}
        {isLoadingBookings ? (
          <Loader />
        ) : (
          filteredBookings.length !== 0 && (
            <Table
              data={filteredBookings}
              option="dashboard"
              tableHeader={tableHeader}
              rowsGenerator={rowsToRender}
              paginate={false}
              draggableRow={false}
            />
          )
        )}
        {isLoadingContacts ? (
          <Loader />
        ) : (
          <ContactPreview
            title="Latest Contacts"
            data={latestContact}
            variant={1}
            //shadow="0px 4px 4px #00000005"
          />
        )}
      </>
    </MainContainer>
  );
}

export default Dashboard;
