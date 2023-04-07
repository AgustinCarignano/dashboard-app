import React, { useEffect, useState } from "react";
import SmallCard from "../../components/SmallCard";
import MainContainer from "../../components/MainContainer";
import ContactPreview from "../../components/ContactPreview";
import { getAllData } from "../../mockService/service";
import { formatDate } from "../../utils";
import Table from "../../components/Table";
import styled from "styled-components";

const FirstColumn = styled.div`
  display: flex;
  gap: 20px;
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
      color: #393939;
    }
    p {
      font: normal 400 14px/21px "Poppins", Sans-Serif;
      color: #4e4e4e;
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
  const [bookingsData, setBookingsData] = useState([]);
  const [latestContact, setLatestContact] = useState([]);
  const [period, setPeriod] = useState({});
  const [filteredBookings, setFilteredBookings] = useState([]);
  const hardcodedDate = { start: 1647298800000, end: 1649973600000 };

  const tableHeader = [
    { label: "Room" },
    { label: "Guest" },
    { label: "Check In" },
    { label: "Check Out" },
  ];
  const rowsToRender = (item) => {
    let [checkInDate, checkInTime] = formatDate(item.checkIn);
    let [checkOutDate, checkOutTime] = formatDate(item.checkOut);
    return (
      <>
        <td style={{ width: "375px" }}>
          <FirstColumn>
            <img src={item.roomImg} />
            <div>
              <h4>{item.roomType}</h4>
              <p>{item.roomNumber}</p>
            </div>
          </FirstColumn>
        </td>
        <td>{item.guest}</td>
        <td>
          <p>{checkInDate}</p>
          <p>{checkInTime}</p>
        </td>
        <td>
          <p>{checkOutDate}</p>
          <p>{checkOutTime}</p>
        </td>
      </>
    );
  };

  async function getBookingData() {
    const data = await getAllData("bookings_data.json");
    setBookingsData(data);
  }

  async function getContacts() {
    const data = await getAllData("contact_data.json");
    setLatestContact(data);
  }

  useEffect(() => {
    getBookingData();
    getContacts();
    setPeriod(hardcodedDate);
  }, []);

  useEffect(() => {
    const filterData = bookingsData.filter(
      (item) => item.orderDate > period.start && item.orderDate < period.end
    );
    setFilteredBookings(filterData);
  }, [bookingsData, period]);

  return (
    <MainContainer>
      {cardsInfo.map((item, index) => (
        <SmallCard type={item.type} number={item.number} key={index} />
      ))}
      {filteredBookings.length !== 0 && (
        <Table
          data={filteredBookings}
          option="dashboard"
          tableHeader={tableHeader}
          rows={rowsToRender}
          paginate={false}
        />
      )}
      {latestContact.length === 0 ? (
        <h3>Loading</h3>
      ) : (
        <ContactPreview
          title="Latest Contacts"
          data={latestContact}
          bg_color="#fff"
          shadow="0px 4px 4px #00000005"
        />
      )}
    </MainContainer>
  );
}

export default Dashboard;
